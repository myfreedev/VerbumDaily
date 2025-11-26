import { Suspense } from "react";
import ChatContent from "./ChatContent";

export default function ChatPage() {
    return (
        <Suspense fallback={
            <div className="flex-1 flex items-center justify-center">
                <div className="text-divine-blue animate-pulse">Loading chat...</div>
            </div>
        }>
            <ChatContent />
        </Suspense>
    );
}
