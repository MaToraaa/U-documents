'use server'

import { clerkClient, currentUser, EmailAddress } from "@clerk/nextjs/server"
import { parseStringify } from "../utils"
import { liveblocks } from "../liveblocks"

export const getClerkUsers = async ({userIds}:{userIds:string[]}) =>{
    try {
        const {data} = await clerkClient.users.getUserList({
            emailAddress:userIds,
        })
        const users = data.map((user)=>({
            id:user.id,
            name:`${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress,
            avatar: user.imageUrl
        }))

        const sortedUser = userIds.map(email => users.find(user => user.email === email))
        return parseStringify(sortedUser)
    } catch (error) {
        console.log("🚀 ~ getClerkUsers ~ error:", error)
        
    }
}
export const getDocumentUsers = async ({roomId, currentUser, text} : {roomId:string, currentUser:string, text:string}) => {
    try {
        const room = await liveblocks.getRoom(roomId)
        const users = Object.keys(room.usersAccesses).filter(email=> email !== currentUser)
        if(text.length){
            const lowerCaseText = text.toLowerCase()
            const filteredUsers = users.filter(email => email.toLowerCase().includes(lowerCaseText))

            return parseStringify(filteredUsers)
        }
        return parseStringify(users)
    } catch (error) {
        console.log("🚀 ~ getDocumentUsers ~ error:", error)
        
    }
}