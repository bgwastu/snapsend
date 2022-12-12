<div align="center">
  <img alt="Snapsend logo" width=60 src="https://user-images.githubusercontent.com/67826350/187028090-5fa001bc-f35f-4b6b-8a3b-729fa6e4ec29.png">
  <h1>Snapsend</h1>
</div>

Snapsend is a free and open-source application that allows you to share photos for a limited time and a limited number of recipients.

[Install Snapsend on Deta Space](https://alpha.deta.space/discovery/r/p6g1jcqtymu4e5bs)

## Features

- Set the timer for the photos to expire
- The photo will be deleted after 24 hours if not opened
- Detect if the user is already viewed the photo
- Anonymous, no login required

## Screenshots

### Homepage

![Homepage](https://user-images.githubusercontent.com/67826350/187028255-ab1d6f86-079d-4234-a493-8c2a5a8e32a9.png)

### Share Snap

![Share Snap](https://user-images.githubusercontent.com/67826350/187028137-1f2da01a-4bc9-4a54-b0fa-63f08e04e1d7.png)

### Viewing Snap

![View Snap](https://user-images.githubusercontent.com/67826350/187028140-0df30e0b-a159-49ac-a068-a17e6efe49bf.png)

## Technologies Used

- Next.js
- Fingerprint.js
- Mantine
- [Deta Space](https://deta.space/)

## How to run it locally

### Prerequisites

- Empty [Deta Space Project](https://deta.space/) for accessing Base for database
- Node.js
- Yarn

### Local installation

1. Clone the repository
2. Copy the `.env.example` file to `.env.local` and fill the required values
3. Run `yarn`
4. Run `yarn start`
