import React from 'react'

const ChatProfile = () => {
    return (
        <>
         <div
          className="flex flex-col items-center bg-gray-50 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
        >
          <div className="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src="https://avatars3.githubusercontent.com/u/2763884?s=128"
              alt="Avatar"
              className="h-full w-full"
            />
          </div>
          <div className="text-sm font-semibold mt-2">Aminos Co.</div>
          <div className="text-xs text-gray-500">Lead UI/UX Designer</div>
          <div className="flex flex-row items-center mt-3">
            <div
              className="flex flex-col justify-center h-4 w-8 bg-orange-500 rounded-full"
            >
              <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
            </div>
            <div className="leading-none ml-1 text-xs">Active</div>
          </div>
        </div>
        </>
    )
}

export default ChatProfile;