import {
    ChannelPermissionSuccessResponse,
    ObjectOfThePerms,
    TargetPayload,
} from "../../common/interfaces/general/Permissions";
import {
    PermissionsBits,
    PermissionsType,
} from "../../common/interfaces/general/Permissions";
import { Client } from "../../client/Client";
import { Nullable } from "../../common";
import * as Endpoints from "../../rest/Endpoints";
import { PermissionManager } from "../Flags/Permission";
import { ClientError } from "../../client/errors/ClientError";
import { ErrorNames } from "../../client/errors/ErrorList";
import { RESTResponse } from "../../rest/requestHandler";
import { GuildChannel } from "../GuildChannel";
import { Member } from "../Member";

export class ChannelPermissionManager {
    #permissionsBits = PermissionsBits;
    #client: Client;
    private readonly channelId: string;

    /**
     * Constructs a new ChannelPermissionManager instance.
     * @param {string} channelId - The ID of the target channel.
     * @param {Client} #client - The #client instance to interact with the API.
     */
    constructor(channelId: string, client: Client) {
        this.channelId = channelId;
        this.#client = client;
    }

    get channel() {
        return this.#client.channels.cache.get(this.channelId) as GuildChannel;
    }

    /**
     * Resolves the permissions into bitwise values.
     * @param {ObjectOfThePerms} permsObj - The permissions to resolve.
     * @returns {Object} - Resolved added and removed permissions.
     */
    private resolvePermissions(permsObj: ObjectOfThePerms) {
        let allow = BigInt(0);
        let deny = BigInt(0);

        if (permsObj.allow) {
            const allowArray = Array.isArray(permsObj.allow)
                ? permsObj.allow
                : [permsObj.allow];
            for (const perm of allowArray) {
                if (!PermissionManager.isValidPermission(perm))
                    throw new ClientError(ErrorNames.InvalidPermission, perm);
                allow |= this.#permissionsBits[perm];
            }
        }

        if (permsObj.deny) {
            const denyArray = Array.isArray(permsObj.deny)
                ? permsObj.deny
                : [permsObj.deny];
            for (const perm of denyArray) {
                if (!PermissionManager.isValidPermission(perm))
                    throw new ClientError(ErrorNames.InvalidPermission, perm);
                deny |= this.#permissionsBits[perm];
            }
        }

        return { allow: allow.toString(), deny: deny.toString() };
    }

    /**
     * Edits permissions for a specific target.
     * @param {TargetPayload} target - The target payload.
     * @param {ObjectOfThePerms} perms - The permissions to apply.
     * @param {Nullable<string>} reason - The reason for the modification.
     * @returns {Promise<ChannelPermissionSuccessResponse | RESTResponse>} - API response.
     */
    async edit(
        target: TargetPayload | "everyone",
        perms: ObjectOfThePerms,
        reason: Nullable<string> = null
    ): Promise<ChannelPermissionSuccessResponse | RESTResponse> {
        const preparedTarget = this.prepareTarget(target);
        const resolvedPerms = this.resolvePermissions(perms);

        const data = {
            id: this.channel?.id,
            targetId: preparedTarget.targetId,
            type: preparedTarget.type,
            allow: resolvedPerms.allow || [],
            deny: resolvedPerms.deny || [],
        };

        const response = await this.#client.rest.request(
            "PUT",
            Endpoints.ChannelPermissions(this.channelId, data.targetId),
            true,
            data,
            reason
        );

        return response as ChannelPermissionSuccessResponse;
    }

    /**
     * Adds permissions for a specific target.
     * @param {TargetPayload} target - The target payload.
     * @param {PermissionsType[]} permissions - The permissions to add.
     * @param {Nullable<string>} reason - The reason for adding permissions.
     * @returns {Promise<ChannelPermissionSuccessResponse | RESTResponse>} - API response.
     */
    async add(
        target: TargetPayload,
        permissions: PermissionsType[] | PermissionsType,
        reason: Nullable<string> = null
    ): Promise<ChannelPermissionSuccessResponse | RESTResponse> {
        const perms: ObjectOfThePerms = { allow: permissions };
        return this.edit(target, perms, reason);
    }

    /**
     * Removes permissions for a specific target.
     * @param {TargetPayload} target - The target payload.
     * @param {PermissionsType[]} permissions - The permissions to remove.
     * @param {Nullable<string>} reason - The reason for removing permissions.
     * @returns {Promise<ChannelPermissionSuccessResponse | RESTResponse>} - API response.
     */
    async remove(
        target: TargetPayload,
        permissions: PermissionsType[] | PermissionsType,
        reason: Nullable<string> = null
    ): Promise<ChannelPermissionSuccessResponse | RESTResponse> {
        const perms: ObjectOfThePerms = { deny: permissions };
        return this.edit(target, perms, reason);
    }

    /**
     * Utility to get the allow and deny bitfields for a target in the channel.
     * @param {TargetPayload} target - The target payload to prepare.
     * @returns {{ allow: bigint, deny: bigint }} - The allow and deny bitfields for the target.
     */
    private getPermissionBitfields(target: TargetPayload): {
        allow: bigint;
        deny: bigint;
    } {
        const preparedTarget = this.prepareTarget(target);
        const permissionOverwrites = this.channel?.permission_overwrites || [];
        const targetOverwrites = permissionOverwrites.find(
            (overwrite) => overwrite.id === preparedTarget.targetId
        );

        var allow = BigInt(0);
        var deny = BigInt(0);

        if (targetOverwrites) {
            allow |= BigInt(targetOverwrites.allow);
            deny |= BigInt(targetOverwrites.deny);
        }

        if(preparedTarget.type === "1") {
            target.target = target.target as Member
            if(target.target?.role_ids) {
                for(const roleId of target.target?.role_ids) {
                    const founded = permissionOverwrites.find(
                        (overwrite) => overwrite.id === roleId
                    );
                    if(!founded) continue;

                    allow |= BigInt(founded.allow);
                    deny |= BigInt(founded.deny);
                }
            }
        }

        return { allow, deny };
    }

    /**
     * Checks if a target has all the specified permissions in the channel.
     * @param {TargetPayload} target - The target payload (e.g., user or role) whose permissions are being checked.
     * @param {Partial<Record<PermissionsType, boolean>>} permissions - An object where keys are permission names,
     * and values are booleans indicating whether the target should have (`true`) or not have (`false`) the permission.
     * @returns {Promise<boolean>} - Returns true if the target has all the permissions required, otherwise false.
     */
    async has(
        target: TargetPayload,
        permissions:
            | PermissionsType
            | PermissionsType[]
            | Partial<Record<PermissionsType, boolean>>,
        forceAdmin: boolean = false,
        matchAll: boolean = true
    ): Promise<boolean> {
        if (!permissions || !["string", "object"].includes(typeof permissions)) {
            throw new ClientError(
                ErrorNames.InvalidType,
                "string | object",
                "permissions"
            );
        }
    
        const { allow } = this.getPermissionBitfields(target);
        const adminPerm = BigInt(this.#permissionsBits.ADMINISTRATOR);
    
        const userHasAdmin = (allow & adminPerm) === adminPerm;
    
        // Si es un string, conviértelo a un array para procesarlo uniformemente
        if (typeof permissions === "string") {
            permissions = [permissions];
        }
    
        if (typeof permissions === "object" && !Array.isArray(permissions)) {
            // Lógica para Partial<Record>
            const conditions = Object.entries(permissions).map(([permission, required]) => {
                const permissionBit = BigInt(this.#permissionsBits[permission as PermissionsType]);
    
                if (!permissionBit) {
                    throw new ClientError(ErrorNames.InvalidPermission, permission);
                }
    
                let hasPermission = (allow & permissionBit) === permissionBit;
    
                if (forceAdmin && !hasPermission) {
                    hasPermission = userHasAdmin;
                }
    
                return required ? hasPermission : !hasPermission;
            });
    
            return matchAll ? conditions.every(Boolean) : conditions.some(Boolean);
        }
    
        // Lógica para arreglos
        const permissionList = Array.isArray(permissions) ? permissions : [permissions];
    
        const results = permissionList.map((permission) => {
            const permissionBit = BigInt(this.#permissionsBits[permission as PermissionsType]);
    
            if (!permissionBit) {
                throw new ClientError(ErrorNames.InvalidPermission, permission);
            }
    
            let hasPermission = (allow & permissionBit) === permissionBit;
    
            if (forceAdmin && !hasPermission) {
                hasPermission = userHasAdmin;
            }
    
            return hasPermission;
        });
    
        return matchAll ? results.every(Boolean) : results.some(Boolean);
    }    

    /**
     * Checks if a target has at least one of the specified permissions in the channel.
     * @param {TargetPayload} target - The target payload (e.g., user or role) whose permissions are being checked.
     * @param {Partial<Record<PermissionsType, boolean>>} permissions - An object where keys are permission names,
     * and values are booleans indicating whether the target should have (`true`) or not have (`false`) the permission.
     * @returns {Promise<boolean>} - Returns true if the target has at least one of the required permissions, otherwise false.
     */
    async hasAny(
        target: TargetPayload,
        permissions:
            | PermissionsType
            | PermissionsType[]
            | Partial<Record<PermissionsType, boolean>>
    ): Promise<boolean> {
        if (!permissions || !["string", "object"].includes(typeof permissions))
            throw new ClientError(
                ErrorNames.InvalidType,
                "string | object",
                "permissions"
            );

        if (typeof permissions === "string") {
            permissions = [permissions];
        }

        const { allow } = this.getPermissionBitfields(target);

        return Object.entries(permissions).some(([permission, value]) => {
            const permissionBit = BigInt(
                this.#permissionsBits[permission as PermissionsType]
            );

            if (!permissionBit)
                throw new ClientError(ErrorNames.InvalidPermission, permission);

            const hasPermission = (allow & permissionBit) === permissionBit;

            return value ? hasPermission : !hasPermission;
        });
    }

    private determineTargetType(target: any): "0" | "1" {
        const isUser =
            target?.constructor?.type === "User" ||
            target?.constructor?.type === "Member" ||
            target?.constructor?.type === "ThreadMember";

        return isUser ? "1" : "0";
    }

    private prepareTarget(
        target: TargetPayload | "everyone"
    ): Required<{ targetId: string; type: "0" | "1" }> {
        let targetId: string;
        let targetType: "0" | "1";

        if (target === "everyone") {
            targetId = this.channel?.guildId as string;
            targetType = "0";
        } else {
            targetId = target.target?.id;
            targetType = target.type ?? this.determineTargetType(target.target);
        }

        return {
            targetId,
            type: targetType,
        };
    }
}
