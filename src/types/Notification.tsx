export interface INotification {
  _id: string
  creatorId: string
  creatorName: string
  receiverId: string
  receiverName: string
  type: string
  description: string
  createdAt: string
  unreadStatus: boolean
  eventId: string
}

export interface ReadNotificationPayload {
  notificationId: string
  pageNumber: number
}
