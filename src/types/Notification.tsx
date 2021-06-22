export default interface INotification {
  _id: string
  creatorId: string
  creatorName: string
  receiverId: string
  receiverName: string
  type: string
  description: string
  CreatedAt: string
  UnreadStatus: boolean
}
