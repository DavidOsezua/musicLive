import yagmail
yag = yagmail.SMTP("daretimileyin1@gmail.com",'jugj imek yype zdne')
contents = [
    "This is the body, and here is just text http://somedomain/image.png",
    "You can find an audio file attached.", '/local/path/to/song.mp3'
]
yag.send('daretimileyin1@gmail.com', 'Testing', contents)

