"use client"

import { Box, Stack, TextField,Button, Typography,AppBar, Toolbar, IconButton, Link } from "@mui/material"
import { useState, useEffect } from "react"
import backgroundImage from '../background2.jpg';
import * as React from 'react';
import {useUser} from "@auth0/nextjs-auth0/client"
import { useRouter } from 'next/navigation';

export default function Home() {
  const {user,error, isLoading} = useUser()
  const router = useRouter();

  if(!user){
    router.push("./")
  }


  const [messages,setMessages] = useState([
    {role:'assistant', content:`Hi! I'm the headstarter assistant, how can I help you today?`}
  ])

  const [message, setMessage] = useState('')
  


  const sendMessage = async() =>{
    setMessage('')
    setMessages((messages)=>[...messages, 
      {role:'user',content:message},
      {role: 'assistant', content:''}])
    const response = fetch('/api/chat', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify([...messages,{role:'user',content:message}]),
    }).then( async (res)=>{
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let result = ''
      return reader.read().then(function processText({done,value}) {
        if (done){
          return result
        }
        const text = decoder.decode(value || new Uint8Array(), {stream: true}) 

        // Split text at '**' and join with newlines
        const formattedText = text.split('**').join('\n');

        setMessages((messages) => {
          let lastMessage = messages[messages.length-1]
          let otherMessages = messages.slice(0,messages.length-1)

          return [...otherMessages, {...lastMessage,content:lastMessage.content+formattedText}]
        })
        return reader.read().then(processText)
      })
    })
    
  }
  
  return (
    <Box
    width="100vw"
    height="100vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    sx={{
      backgroundImage:`url(${backgroundImage.src})` ,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Box  
      width="100vw"
      sx={{ flexGrow: 1 }}>
        <AppBar 
        position="static"
        sx={{
          backgroundColor:'rgba(0, 0, 0, 0.8)',
          boxShadow: '0px 4px 10px 0px rgba(255, 255, 255, 0.85)'
        }}
        >
          <Toolbar >
            <Typography 
            variant="h6" 
            component="div" 
            color="white" 
            underline="none" 
            sx={{ flexGrow: 1 }}>
                Chat Support
            </Typography>

              <Button 
              color="inherit" 
              variant="contained"
              sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  boxShadow: '0px 4px 10px 0px rgba(255, 255, 255, 0.6)'
                    }}> 
              <Link href = "/api/auth/logout" color="black" underline="none">
                  Logout
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/** The message history */}
      <Stack 
      direction={'column'} 
      width="550px" 
      height="85%" 
      spacing={2} 
      paddingY={2}
      paddingX={2}
      margin={2}
      borderRadius={6}
      sx={{
        backgroundColor:'rgba(0, 0, 0, 0.7)',
        boxShadow: '0px 4px 10px 0px rgba(255, 255, 255, 0.85)',
        color:"white"
    }}
      >
        {/** These will be our actual messages */}
        <Stack 
        direction={'column'} 
        spacing={2}
        flexGrow={1}
        overflow="auto"
        maxHeight="100%">
          {
            messages.map((message, index) => (
              <Box
              key={index}
              display="flex"
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}>
                <Box
                bgcolor={message.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                color="white"
                borderRadius={16}
                p={3}
                fontFamily={"Outfit"}
                fontSize={18}>
                  {message.content}
                </Box>
              </Box>
            ))}
        </Stack>
        {/** Where the user enters messages */}
        <Stack direction={"row"} spacing={2}>
          <TextField 
          label="Message" 
          sx={{
            backgroundColor:'rgba(255, 255, 255, 0.7)',
            boxShadow: '0px 4px 10px 0px rgba(255, 255, 255, 0.85)',
            color:"white",
            borderRadius:5,
          }}
          variant="filled"
          fullWidth 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}/>
          <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            boxShadow: '0px 4px 10px 0px rgba(255, 255, 255, 0.6)',
            color:"black"
             }}
          onClick={sendMessage}>
            Send</Button>
        </Stack>
      </Stack>
    </Box>
  )
}
