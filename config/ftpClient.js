import ftp from 'basic-ftp'

export const settings = {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    secure: false
}

export const client = new ftp.Client()