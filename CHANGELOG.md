# Features
1. CRUD Tasks
2. Assign Users
3. Update the status
4. Add Comment
5. Add History


# Task Fields
1. TaskName: string
2. TaskDescription: string
3. CreatedAt: datetime
4. Assignee: string
5. Status: string
6. ID: string
7. Comments: string[]
8. History: object<user, datetime, description>[]

# Status values
1. Open
2. Closed
3. onProgress
4. onHold
5. Completed