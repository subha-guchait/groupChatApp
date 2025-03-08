import React, { useState, useEffect, useRef } from "react";
import useInput from "../../hooks/useInput";

import { Image, X, SendHorizontal } from "lucide-react";

const MessageInput = ({ activeGroup, setMessages, isMember, setIsMember }) => {
  const {
    input,
    setInput,
    mediaPreview,
    handleImageChange,
    handleSendMessage,
    removeMedia,
    uploading,
    fileInputRef,
  } = useInput(activeGroup, setMessages, isMember, setIsMember);

  return (
    <div className="p-4 w-full">
      {isMember ? (
        <div>
          {mediaPreview && (
            <div className="mb-3 flex items-center gap-2">
              <div className="relative">
                {mediaPreview.type === "image" ? (
                  <img
                    src={mediaPreview.url}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                  />
                ) : (
                  <video
                    src={mediaPreview.url}
                    controls
                    className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                  />
                )}
                <button
                  onClick={removeMedia}
                  className=" btn btn-circle absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
            flex items-center justify-center"
                  type="button"
                >
                  <X className="size-3" />
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSendMessage}>
            <div className="flex items-center p-4 bg-white-900">
              <input
                type="text"
                className="input input-bordered rounded-lg flex-grow mr-2"
                value={input}
                placeholder="Type a message..."
                onChange={(e) => setInput(e.target.value)}
              />
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <button
                type="button"
                className={`hidden sm:flex btn btn-circle ${
                  mediaPreview ? "text-emerald-500" : "text-zinc-400"
                }`}
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                <Image size={20} />
              </button>
              <button
                className="btn btn-accent btn-md btn-circle px-0"
                disabled={(!input.trim() && !mediaPreview) || uploading}
              >
                {uploading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <SendHorizontal size={20} />
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-red-500 text-center mt-2">
          You are no longer a participant of this group.
        </div>
      )}
    </div>
  );
};

export default MessageInput;
