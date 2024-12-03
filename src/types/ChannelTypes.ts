import { CategoryChannel, Channel, ForumChannel, TextChannel, ThreadChannel, VoiceChannel } from "../structures"
import { TextBasedChannel } from "../structures/TextBasedChannel"

export const ChannelTypes = {
    "Text": 0,
    "DM": 1,
    "Voice": 2,
    "GroupDM": 3,
    "Category": 4,
    "Announcement": 5,
    "AnnouncementThread": 10,
    "PublicThread": 11,
    "PrivateThread": 12,
    "StageVoice": 13,
    "Directory": 14,
    "Forum": 15,
    "Media": 16,
}