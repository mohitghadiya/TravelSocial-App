import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    SafeAreaView,
    Image,
    Modal,
    Alert,
    Pressable,
    PanResponder,
    Animated
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

/* ================= COLORS ================= */
const COLORS = {
    primary: "#FF006F",
    secondary: "#00D4FF",
    bg: "#0B0B14",
    card: "#1C1D2E",
    text: "#FFFFFF",
    subtext: "rgba(255,255,255,0.6)",
    inputBg: "#141526",
    success: "#00FF9D",
    typing: "#FFD166",
    border: "rgba(255,255,255,0.1)",
    online: "#00FF9D",
    myBubble: "#FF006F",
    theirBubble: "#1C1D2E",
    emojiBarBg: "rgba(28, 29, 46, 0.98)",
    reactionBg: "rgba(255, 255, 255, 0.15)",
    menuBg: "#2A2B3D",
    replyBg: "rgba(255, 0, 111, 0.1)",
    replyBorder: "rgba(255, 0, 111, 0.3)",
};

/* ================= DUMMY USER ================= */
const DUMMY_USER = {
    id: "1",
    name: "Bhavik Bhimani",
    username: "bgbhimani",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    isOnline: true,
};

/* ================= EMOJI REACTIONS ================= */
const EMOJIS = ["😂", "😍", "😮", "😢", "👍", "❤️"];

/* ================= DUMMY CHAT ================= */
const INITIAL_MESSAGES = [
    {
        id: "1",
        text: "Ye video nahi dekha re",
        from: "them",
        time: "11:14",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        reactions: [],
        date: "18 Dec, 11:44 pm"
    },
    {
        id: "2",
        text: "Tu kya karta he re",
        from: "them",
        time: "11:14",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        reactions: [],
        date: "18 Dec, 11:44 pm"
    },
    {
        id: "3",
        text: "Naa",
        from: "me",
        time: "11:15",
        reactions: [],
        date: "18 Dec, 11:45 pm"
    },
    {
        id: "4",
        text: "Me peli vakhat joyo aa",
        from: "them",
        time: "11:15",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        reactions: [],
        date: "18 Dec, 11:45 pm"
    },
    {
        id: "5",
        text: "Jay Vasoya College",
        from: "them",
        time: "10:21",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        reactions: [],
        date: "Today, 10:21 pm"
    },
    {
        id: "6",
        text: "Ha pan have badha Saturday Sunday occupy j chhe exam mate",
        from: "them",
        time: "10:21",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        reactions: [],
        date: "Today, 10:21 pm"
    },
    {
        id: "7",
        text: "Haseee",
        from: "me",
        time: "10:22",
        reactions: [],
        date: "Today, 10:22 pm"
    },
    {
        id: "8",
        text: "Re",
        from: "me",
        time: "11:17",
        reactions: [],
        date: "Today, 11:17 pm"
    },
    {
        id: "9",
        text: "Saru chhe mare nathi aavi",
        from: "them",
        time: "11:18",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        reactions: [],
        date: "Today, 11:18 pm"
    },
];

export default function MessageScreen({ route, navigation }) {
    const user = route?.params?.user ?? DUMMY_USER;

    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [text, setText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
    const [showMessageMenu, setShowMessageMenu] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [selectedMessageData, setSelectedMessageData] = useState(null);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyMessage, setReplyMessage] = useState(null);
    const [swipeActive, setSwipeActive] = useState(false);
    const [swipeMessageId, setSwipeMessageId] = useState(null);

    const flatRef = useRef(null);
    const inputRef = useRef(null);
    const swipeX = useRef(new Animated.Value(0)).current;
    const isReactionUpdate = useRef(false);


    /* ================= SWIPE TO REPLY ================= */
    const handleSwipeReply = (messageId) => {
        const message = messages.find(m => m.id === messageId);
        if (!message) return;

        setReplyingTo(messageId);
        setReplyMessage(message);

        // Focus on input field
        setTimeout(() => {
            inputRef.current?.focus();
        }, 300);

        // Reset swipe animation
        Animated.spring(swipeX, {
            toValue: 0,
            useNativeDriver: true,
        }).start();

        setSwipeActive(false);
        setSwipeMessageId(null);
    };

    /* ================= CREATE PAN RESPONDER FOR EACH MESSAGE ================= */
    const createPanResponder = (messageId) => {
        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Only respond to horizontal swipes
                return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 2);
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dx > 0) { // Only right swipe (positive dx)
                    setSwipeActive(true);
                    setSwipeMessageId(messageId);
                    swipeX.setValue(gestureState.dx);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx > 100) { // Threshold for swipe
                    handleSwipeReply(messageId);
                } else {
                    // Reset if not enough swipe
                    Animated.spring(swipeX, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start(() => {
                        setSwipeActive(false);
                        setSwipeMessageId(null);
                    });
                }
            },
            onPanResponderTerminate: () => {
                Animated.spring(swipeX, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start(() => {
                    setSwipeActive(false);
                    setSwipeMessageId(null);
                });
            }
        });
    };


    /* ================= SCROLL TO MESSAGE ================= */
    const scrollToMessage = (messageId) => {
        const index = messages.findIndex(m => m.id === messageId);
        if (index !== -1 && flatRef.current) {
            flatRef.current.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.5
            });
        }
    };

    /* ================= SEND MESSAGE ================= */
    const sendMessage = () => {
        if (!text.trim()) return;

        const newMsg = {
            id: Date.now().toString(),
            text: text.trim(),
            from: "me",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            reactions: [],
            date: new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short'
            }) + ", " + new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }),
            replyTo: replyMessage ? {
                id: replyMessage.id,
                text: replyMessage.text,
                from: replyMessage.from,
                senderName: replyMessage.from === "me" ? "You" : user.name
            } : null
        };

        setMessages((prev) => [...prev, newMsg]);
        setText("");
        setReplyMessage(null);
        setReplyingTo(null);
        setIsTyping(true);

        // Simulate typing and reply
        setTimeout(() => {
            setIsTyping(false);

            const replies = [
                "Hmm",
                "Ok",
                "Acha",
                "Saru",
                "Ha",
                "Nathi"
            ];

            const replyMsg = {
                id: (Date.now() + 1).toString(),
                text: replies[Math.floor(Math.random() * replies.length)],
                from: "them",
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                avatar: user.avatar,
                reactions: [],
                date: new Date().toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short'
                }) + ", " + new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                })
            };

            setMessages((prev) => [...prev, replyMsg]);
        }, 1000);
    };

    /* ================= HANDLE MESSAGE LONG PRESS ================= */
    const handleMessageLongPress = (messageId) => {
        const message = messages.find(m => m.id === messageId);
        if (!message) return;

        setSelectedMessage(messageId);
        setSelectedMessageData(message);
        setShowMessageMenu(true);
    };

    /* ================= HANDLE EMOJI REACTION ================= */
    const handleEmojiReaction = (emoji) => {
        if (!selectedMessage) return;

        // 🔒 Mark this update as reaction-only
        isReactionUpdate.current = true;

        setMessages(prev =>
            prev.map(msg => {
                if (msg.id === selectedMessage) {
                    const existingReactionIndex = msg.reactions.findIndex(
                        r => r.emoji === emoji
                    );

                    let newReactions = [...msg.reactions];

                    if (existingReactionIndex >= 0) {
                        if (newReactions[existingReactionIndex].count === 1) {
                            newReactions.splice(existingReactionIndex, 1);
                        } else {
                            newReactions[existingReactionIndex].count -= 1;
                        }
                    } else {
                        newReactions.push({
                            emoji,
                            count: 1,
                            reactedByMe: true,
                        });
                    }

                    return { ...msg, reactions: newReactions };
                }
                return msg;
            })
        );

        setShowMessageMenu(false);
        setSelectedMessage(null);
        setSelectedMessageData(null);
    };

    /* ================= HANDLE MESSAGE MENU ACTIONS ================= */
    const handleReply = () => {
        if (selectedMessageData) {
            setReplyingTo(selectedMessageData.id);
            setReplyMessage(selectedMessageData);
            setShowMessageMenu(false);
            setSelectedMessage(null);
            setSelectedMessageData(null);

            // Focus on input field
            setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
        }
    };

    const handleAddSticker = () => {
        Alert.alert("Add Sticker", "Sticker added to message");
        setShowMessageMenu(false);
    };

    const handleForward = () => {
        Alert.alert("Forward", "Forward message to someone");
        setShowMessageMenu(false);
    };

    const handleCopy = () => {
        if (selectedMessageData) {
            Alert.alert("Copied", "Message copied to clipboard");
            // Here you would use Clipboard from react-native
        }
        setShowMessageMenu(false);
    };

    const handleMakeAIImage = () => {
        Alert.alert("AI Image", "Create AI image from message");
        setShowMessageMenu(false);
    };

    const handleUnsend = () => {
        Alert.alert("Unsend", "Message unsent successfully");
        if (selectedMessage) {
            setMessages(prev => prev.filter(msg => msg.id !== selectedMessage));
        }
        setShowMessageMenu(false);
    };

    /* ================= CANCEL REPLY ================= */
    const cancelReply = () => {
        setReplyingTo(null);
        setReplyMessage(null);
    };

    /* ================= RENDER REPLY PREVIEW ================= */
    const renderReplyPreview = () => {
        if (!replyMessage) return null;

        const isReplyFromMe = replyMessage.from === "me";

        return (
            <View style={styles.replyPreviewContainer}>
                <View style={styles.replyPreviewContent}>
                    <View style={styles.replyPreviewLeft}>
                        <View style={[
                            styles.replyPreviewIndicator,
                            { backgroundColor: isReplyFromMe ? COLORS.myBubble : COLORS.primary }
                        ]} />
                        <View style={styles.replyPreviewTextContainer}>
                            <Text style={styles.replyPreviewSender}>
                                {isReplyFromMe ? "You" : user.name}
                            </Text>
                            <Text style={styles.replyPreviewText} numberOfLines={1}>
                                {replyMessage.text}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={cancelReply} style={styles.replyCancelButton}>
                        <Ionicons name="close" size={20} color={COLORS.subtext} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    /* ================= ENHANCED ATTACHMENT MENU ================= */
    const AttachmentMenu = () => (
        <Modal
            transparent
            visible={showAttachmentMenu}
            animationType="fade"
            onRequestClose={() => setShowAttachmentMenu(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setShowAttachmentMenu(false)}
            >
                <View style={styles.attachmentMenu}>
                    <View style={styles.attachmentRow}>
                        <TouchableOpacity style={styles.attachmentItem} onPress={() => {
                            setShowAttachmentMenu(false);
                            Alert.alert("Camera", "Camera would open here");
                        }}>
                            <View style={[styles.attachmentIcon, { backgroundColor: "#2196F3" }]}>
                                <Ionicons name="camera" size={28} color="#FFF" />
                            </View>
                            <Text style={styles.attachmentText}>Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.attachmentItem} onPress={() => {
                            setShowAttachmentMenu(false);
                            Alert.alert("Gallery", "Photo & Video gallery would open here");
                        }}>
                            <View style={[styles.attachmentIcon, { backgroundColor: "#4CAF50" }]}>
                                <Ionicons name="images" size={28} color="#FFF" />
                            </View>
                            <Text style={styles.attachmentText}>Gallery</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.attachmentItem} onPress={() => {
                            setShowAttachmentMenu(false);
                            Alert.alert("Document", "Document picker would open here");
                        }}>
                            <View style={[styles.attachmentIcon, { backgroundColor: "#FF9800" }]}>
                                <MaterialIcons name="insert-drive-file" size={28} color="#FFF" />
                            </View>
                            <Text style={styles.attachmentText}>Document</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.attachmentRow}>
                        <TouchableOpacity style={styles.attachmentItem} onPress={() => {
                            setShowAttachmentMenu(false);
                            Alert.alert("Audio", "Audio recorder would open here");
                        }}>
                            <View style={[styles.attachmentIcon, { backgroundColor: "#9C27B0" }]}>
                                <Ionicons name="mic" size={28} color="#FFF" />
                            </View>
                            <Text style={styles.attachmentText}>Audio</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.attachmentItem} onPress={() => {
                            setShowAttachmentMenu(false);
                            Alert.alert("Location", "Location picker would open here");
                        }}>
                            <View style={[styles.attachmentIcon, { backgroundColor: "#F44336" }]}>
                                <Ionicons name="location" size={28} color="#FFF" />
                            </View>
                            <Text style={styles.attachmentText}>Location</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.attachmentItem} onPress={() => {
                            setShowAttachmentMenu(false);
                            Alert.alert("Contact", "Contact picker would open here");
                        }}>
                            <View style={[styles.attachmentIcon, { backgroundColor: "#00BCD4" }]}>
                                <Ionicons name="person" size={28} color="#FFF" />
                            </View>
                            <Text style={styles.attachmentText}>Contact</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setShowAttachmentMenu(false)}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    /* ================= MESSAGE CONTEXT MENU ================= */
    const MessageContextMenu = () => {
        if (!showMessageMenu || !selectedMessageData) return null;

        const isMe = selectedMessageData.from === "me";

        return (
            <Modal
                transparent
                visible={showMessageMenu}
                animationType="fade"
                onRequestClose={() => {
                    setShowMessageMenu(false);
                    setSelectedMessage(null);
                    setSelectedMessageData(null);
                }}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => {
                        setShowMessageMenu(false);
                        setSelectedMessage(null);
                        setSelectedMessageData(null);
                    }}
                >
                    {/* Message Menu Container */}
                    <View style={styles.messageMenuContainer}>
                        {/* Emoji Bar at the Top (replaces Message Header) */}
                        <View style={styles.emojiBarContainer}>
                            <View style={styles.emojiBar}>
                                {EMOJIS.map((emoji, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.emojiButton}
                                        onPress={() => handleEmojiReaction(emoji)}
                                    >
                                        <Text style={styles.emojiText}>{emoji}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Menu Options */}
                        <View style={styles.messageMenu}>
                            {/* Reply Button */}
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={handleReply}
                            >
                                <Ionicons name="arrow-redo-outline" size={22} color={COLORS.text} />
                                <Text style={styles.menuItemText}>Reply</Text>
                            </TouchableOpacity>

                            {/* Add Sticker Button */}
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={handleAddSticker}
                            >
                                <MaterialCommunityIcons name="sticker-emoji" size={22} color={COLORS.text} />
                                <Text style={styles.menuItemText}>Add sticker</Text>
                            </TouchableOpacity>

                            {/* Forward Button */}
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={handleForward}
                            >
                                <Ionicons name="arrow-forward-outline" size={22} color={COLORS.text} />
                                <Text style={styles.menuItemText}>Forward</Text>
                            </TouchableOpacity>

                            {/* Copy Button */}
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={handleCopy}
                            >
                                <Ionicons name="copy-outline" size={22} color={COLORS.text} />
                                <Text style={styles.menuItemText}>Copy</Text>
                            </TouchableOpacity>

                            {/* Make AI Image Button */}
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={handleMakeAIImage}
                            >
                                <MaterialIcons name="auto-awesome" size={22} color={COLORS.text} />
                                <Text style={styles.menuItemText}>Make AI image</Text>
                            </TouchableOpacity>

                            {/* Unsend Button (only for my messages) */}
                            {isMe && (
                                <TouchableOpacity
                                    style={[styles.menuItem, styles.deleteItem]}
                                    onPress={handleUnsend}
                                >
                                    <Ionicons name="trash-outline" size={22} color="#FF5252" />
                                    <Text style={[styles.menuItemText, styles.deleteText]}>Unsend</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Cancel Button */}
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => {
                                setShowMessageMenu(false);
                                setSelectedMessage(null);
                                setSelectedMessageData(null);
                            }}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        );
    };

    /* ================= SWIPE INDICATOR COMPONENT ================= */
    const SwipeIndicator = ({ isMe, isActive }) => {
        if (!isActive) return null;

        return (
            <View style={[
                styles.swipeIndicatorContainer,
                isMe ? styles.mySwipeIndicator : styles.theirSwipeIndicator
            ]}>
                <Ionicons
                    name="arrow-redo"
                    size={20}
                    color={COLORS.primary}
                    style={styles.swipeIcon}
                />
                <Text style={styles.swipeText}>Reply</Text>
            </View>
        );
    };

    /* ================= RENDER MESSAGE ================= */
    const renderMessage = ({ item, index }) => {
        const isMe = item.from === "me";
        const isLastInGroup = index === messages.length - 1 || messages[index + 1].from !== item.from;
        const isReplying = replyingTo === item.id;
        const hasReply = item.replyTo;
        const isSwiping = swipeActive && swipeMessageId === item.id;
        const panResponder = createPanResponder(item.id);

        return (
            <Animated.View
                style={[
                    styles.messageWrapper,
                    {
                        transform: [
                            {
                                translateX: isSwiping ? swipeX : 0
                            }
                        ]
                    }
                ]}
                {...panResponder.panHandlers}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onLongPress={() => handleMessageLongPress(item.id)}
                    onPress={() => {
                        if (item.replyTo?.id) {
                            scrollToMessage(item.replyTo.id);
                        }
                    }}
                    style={[
                        styles.messageContainer,
                        isMe ? styles.myMessageContainer : styles.theirMessageContainer,
                        isReplying && styles.replyingMessage
                    ]}
                >
                    {!isMe && isLastInGroup && (
                        <Image source={{ uri: item.avatar }} style={styles.messageAvatar} />
                    )}
                    {!isMe && !isLastInGroup && <View style={styles.avatarPlaceholder} />}

                    <View style={[styles.messageBubbleContainer, isMe ? styles.myBubbleContainer : styles.theirBubbleContainer]}>
                        <View style={[styles.messageBubble, isMe ? styles.myBubble : styles.theirBubble]}>
                            {/* Reply Preview in Message */}
                            {hasReply && (
                                <TouchableOpacity
                                    style={[
                                        styles.replyPreviewInMessage,
                                        isMe ? styles.myReplyPreview : styles.theirReplyPreview
                                    ]}
                                    onPress={() => scrollToMessage(item.replyTo.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[
                                        styles.replyPreviewInMessageIndicator,
                                        { backgroundColor: item.replyTo.from === "me" ? COLORS.myBubble : COLORS.primary }
                                    ]} />
                                    <View style={styles.replyPreviewInMessageContent}>
                                        <Text style={styles.replyPreviewInMessageSender}>
                                            {item.replyTo.senderName}
                                        </Text>
                                        <Text style={styles.replyPreviewInMessageText} numberOfLines={1}>
                                            {item.replyTo.text}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}

                            {/* Message Text */}
                            <Text style={isMe ? styles.myMessageText : styles.theirMessageText}>
                                {item.text}
                            </Text>

                            {/* Time */}
                            <Text style={[
                                styles.messageTime,
                                isMe ? styles.myMessageTime : styles.theirMessageTime
                            ]}>
                                {item.time}
                            </Text>
                        </View>

                        {/* --- REACTION BADGES --- */}
                        {item.reactions && item.reactions.length > 0 && (
                            <View style={[
                                styles.reactionContainer,
                                isMe ? styles.myReactionContainer : styles.theirReactionContainer
                            ]}>
                                {item.reactions.map((reaction, idx) => (
                                    <View key={idx} style={styles.reactionBadge}>
                                        <Text style={styles.reactionEmojiSmall}>{reaction.emoji}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </TouchableOpacity>

                {/* Swipe Indicator */}
                <SwipeIndicator isMe={isMe} isActive={isSwiping} />
            </Animated.View>
        );
    };

    /* ================= TYPING INDICATOR ================= */
    const renderTypingIndicator = () => {
        if (!isTyping) return null;

        return (
            <View style={styles.typingContainer}>
                <Image
                    source={{ uri: user.avatar }}
                    style={styles.typingAvatar}
                />
                <View style={[styles.messageBubble, styles.theirBubble, styles.typingBubble]}>
                    <View style={styles.typingDots}>
                        <View style={styles.typingDot} />
                        <View style={styles.typingDot} />
                        <View style={styles.typingDot} />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

            {/* ================= HEADER ================= */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="chevron-back" size={24} color={COLORS.text} />
                    </TouchableOpacity>

                    <View style={styles.headerUser}>
                        <View style={styles.headerAvatarContainer}>
                            <Image
                                source={{ uri: user.avatar }}
                                style={styles.headerAvatar}
                            />
                            {user.isOnline && <View style={styles.headerOnlineDot} />}
                        </View>
                        <View style={styles.headerInfo}>
                            <Text style={styles.headerName}>{user.name}</Text>
                            <Text style={styles.headerStatus}>
                                {isTyping ? "typing..." : "online"}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.headerActionButton}>
                        <Ionicons name="call-outline" size={22} color={COLORS.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerActionButton}>
                        <Ionicons name="videocam-outline" size={22} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* ================= MESSAGES ================= */}
            <FlatList
                ref={flatRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.messagesContainer}
                showsVerticalScrollIndicator={false}
                maintainVisibleContentPosition={{
                    minIndexForVisible: 0,
                    autoscrollToTopThreshold: 10,
                }}
                onContentSizeChange={() => {
                    // ❌ Do nothing if it's a reaction update
                    if (isReactionUpdate.current) {
                        isReactionUpdate.current = false;
                        return;
                    }

                    // ✅ Only auto-scroll for new messages
                    const lastMessage = messages[messages.length - 1];
                    if (lastMessage?.from === "me") {
                        setTimeout(() => {
                            flatRef.current?.scrollToEnd({ animated: true });
                        }, 100);
                    }
                }}

                ListFooterComponent={renderTypingIndicator}
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled"
                automaticallyAdjustContentInsets={false}
            />

            {/* ================= MESSAGE CONTEXT MENU ================= */}
            <MessageContextMenu />

            {/* ================= ATTACHMENT MENU ================= */}
            <AttachmentMenu />

            {/* ================= REPLY PREVIEW ================= */}
            {renderReplyPreview()}

            {/* ================= INPUT ================= */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            >
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TouchableOpacity
                            style={styles.attachButton}
                            onPress={() => setShowAttachmentMenu(true)}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="add-circle" size={30} color={COLORS.primary} />
                        </TouchableOpacity>

                        <View style={styles.inputBox}>
                            <TextInput
                                ref={inputRef}
                                value={text}
                                onChangeText={setText}
                                placeholder="iMessage"
                                placeholderTextColor={COLORS.subtext}
                                style={styles.input}
                                multiline
                                maxHeight={100}
                                enablesReturnKeyAutomatically={true}
                                returnKeyType="send"
                                onSubmitEditing={sendMessage}
                            />
                        </View>

                        {text.trim() ? (
                            <TouchableOpacity
                                onPress={sendMessage}
                                style={styles.sendButton}
                                activeOpacity={0.8}
                            >
                                <Ionicons
                                    name="arrow-up-circle"
                                    size={32}
                                    color={COLORS.primary}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.micButton}>
                                <Ionicons
                                    name="mic-outline"
                                    size={24}
                                    color={COLORS.subtext}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.bg,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    backButton: {
        padding: 4,
        marginRight: 8,
    },
    headerUser: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    headerAvatarContainer: {
        position: "relative",
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.card,
    },
    headerOnlineDot: {
        position: "absolute",
        bottom: 2,
        right: 2,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.online,
        borderWidth: 2,
        borderColor: COLORS.bg,
    },
    headerInfo: {
        marginLeft: 12,
    },
    headerName: {
        color: COLORS.text,
        fontWeight: "600",
        fontSize: 17,
    },
    headerStatus: {
        color: COLORS.subtext,
        fontSize: 13,
        marginTop: 2,
    },
    headerActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    headerActionButton: {
        padding: 6,
    },
    messagesContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        paddingBottom: 20,
    },
    messageWrapper: {
        marginVertical: 4,
        position: "relative",
    },
    messageContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        position: "relative",
    },
    myMessageContainer: {
        justifyContent: "flex-end",
    },
    theirMessageContainer: {
        justifyContent: "flex-start",
    },
    replyingMessage: {
        opacity: 0.7,
    },
    messageAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
        alignSelf: "flex-end",
        marginBottom: 4,
    },
    avatarPlaceholder: {
        width: 40,
    },
    messageBubbleContainer: {
        position: "relative",
        maxWidth: "80%",
    },
    myBubbleContainer: {
        alignSelf: "flex-end",
    },
    theirBubbleContainer: {
        alignSelf: "flex-start",
    },
    messageBubble: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 18,
    },
    myBubble: {
        backgroundColor: COLORS.myBubble,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 4,
    },
    theirBubble: {
        backgroundColor: COLORS.theirBubble,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 18,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
    },
    myMessageText: {
        color: "#FFFFFF",
        fontSize: 16,
        lineHeight: 22,
    },
    theirMessageText: {
        color: COLORS.text,
        fontSize: 16,
        lineHeight: 22,
    },
    messageTime: {
        fontSize: 11,
        marginTop: 4,
        opacity: 0.7,
    },
    myMessageTime: {
        color: "rgba(255, 255, 255, 0.8)",
        textAlign: "right",
    },
    theirMessageTime: {
        color: "rgba(255, 255, 255, 0.6)",
    },
    // Reply Preview Styles
    replyPreviewContainer: {
        backgroundColor: COLORS.inputBg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    replyPreviewContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    replyPreviewLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    replyPreviewIndicator: {
        width: 3,
        height: 40,
        borderRadius: 2,
        marginRight: 10,
    },
    replyPreviewTextContainer: {
        flex: 1,
    },
    replyPreviewSender: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 2,
    },
    replyPreviewText: {
        color: COLORS.text,
        fontSize: 14,
        opacity: 0.8,
    },
    replyCancelButton: {
        padding: 4,
        marginLeft: 10,
    },
    // Reply in Message Styles
    replyPreviewInMessage: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.replyBg,
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
        borderLeftWidth: 3,
        borderLeftColor: COLORS.replyBorder,
    },
    myReplyPreview: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    theirReplyPreview: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    replyPreviewInMessageIndicator: {
        width: 2,
        height: 30,
        borderRadius: 1,
        marginRight: 8,
    },
    replyPreviewInMessageContent: {
        flex: 1,
    },
    replyPreviewInMessageSender: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 2,
    },
    replyPreviewInMessageText: {
        color: COLORS.text,
        fontSize: 12,
        opacity: 0.8,
    },
    // Reaction Styles
    reactionContainer: {
        position: "absolute",
        bottom: -10,
        flexDirection: "row",
        zIndex: 10,
        height: 24,
        alignItems: "center",
    },
    myReactionContainer: {
        right: 5,
    },
    theirReactionContainer: {
        left: 5,
    },
    reactionBadge: {
        backgroundColor: "#1C1D2E",
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderWidth: 2,
        borderColor: COLORS.bg,
        marginHorizontal: -1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
        minWidth: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    reactionEmojiSmall: {
        fontSize: 12,
    },
    // Swipe to Reply Styles
    swipeIndicatorContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 0, 111, 0.1)",
        borderRadius: 10,
    },
    mySwipeIndicator: {
        left: -85,
    },
    theirSwipeIndicator: {
        right: -85,
    },
    swipeIcon: {
        marginBottom: 4,
    },
    swipeText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: "600",
    },
    typingContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginTop: 8,
        marginLeft: 12,
    },
    typingAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
        alignSelf: "flex-end",
        marginBottom: 4,
    },
    typingBubble: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    typingDots: {
        flexDirection: "row",
        alignItems: "center",
    },
    typingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.subtext,
        marginHorizontal: 2,
    },
    inputContainer: {
        backgroundColor: COLORS.bg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: Platform.OS === "ios" ? 30 : 16,
        paddingTop: 8,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    attachButton: {
        padding: 4,
        marginRight: 8,
    },
    inputBox: {
        flex: 1,
        backgroundColor: COLORS.inputBg,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        maxHeight: 100,
    },
    input: {
        color: COLORS.text,
        fontSize: 17,
        padding: 0,
    },
    sendButton: {
        marginLeft: 8,
    },
    micButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },
    /* Modal Overlay */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    /* Message Menu Container */
    messageMenuContainer: {
        backgroundColor: COLORS.menuBg,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    /* Emoji Bar Container */
    emojiBarContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: COLORS.emojiBarBg,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.1)",
    },
    emojiBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: '90%',
    },
    emojiButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    emojiText: {
        fontSize: 28,
    },
    /* Message Menu */
    messageMenu: {
        padding: 10,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.1)",
    },
    menuItemText: {
        color: COLORS.text,
        fontSize: 17,
        marginLeft: 15,
        fontWeight: "500",
    },
    deleteItem: {
        borderBottomWidth: 0,
    },
    deleteText: {
        color: "#FF5252",
    },
    /* Cancel Button */
    cancelButton: {
        backgroundColor: COLORS.inputBg,
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        margin: 15,
        marginTop: 10,
    },
    cancelButtonText: {
        color: COLORS.primary,
        fontSize: 17,
        fontWeight: "600",
    },
    /* Enhanced Attachment Menu */
    attachmentMenu: {
        backgroundColor: COLORS.card,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: Platform.OS === "ios" ? 40 : 20,
    },
    attachmentRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 25,
    },
    attachmentItem: {
        alignItems: "center",
        width: 90,
    },
    attachmentIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    attachmentText: {
        color: COLORS.text,
        fontSize: 13,
        textAlign: "center",
        fontWeight: "500",
    },
});