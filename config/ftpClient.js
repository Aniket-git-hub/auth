import ftp from 'basic-ftp'

export const settings = {
    host: "ftp.sfsacademy.in",
    user: "sfsacademy@sfsacademy.in",
    password: "shahfaisal1234",
    secure: false
}

export const client = new ftp.Client()