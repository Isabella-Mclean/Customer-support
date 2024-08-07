"use client"
import { Box, Typography, AppBar, Toolbar, Button, IconButton, Link} from "@mui/material"
import backgroundImage from './background2.jpg';
import * as React from 'react';
import {useUser} from "@auth0/nextjs-auth0/client"
import { useRouter } from 'next/navigation';


export default function Home() {
    const {user,error, isLoading} = useUser()
    const router = useRouter();

    if(user){
        router.push('/supportPage');
    }
    

    return(
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
            backgroundPosition: 'center'
        }}
        >
            <Box  
            width="100vw" 
            height="10vh"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            display="flex"
            position="fixed"
            top={0}
            left={0}
            >
                <AppBar 
                position="static" 
                sx={{
                    backgroundColor:'rgba(0, 0, 0, 0.8)',
                    boxShadow: '0px 4px 10px 0px rgba(255, 255, 255, 0.85)'
                }}
                >
                    <Toolbar >
                    <Link href = "" color="white" underline="none" sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" >
                        Chat Support
                    </Typography>
                    </Link>
                   
                    
                    <Button 
                    color="inherit" 
                    variant="contained"
                    sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        marginX: "10px",
                        boxShadow: '0px 4px 10px 0px rgba(255, 255, 255, 0.6)'
                        }}>
                    <Link href = "/api/auth/login" color="black" underline="none">
                       Login
                    </Link>
                    </Button>
                   
                    </Toolbar>
                </AppBar>
            </Box>
            <Box
            width="70%"
            height="60%"
            paddingX={4}
            marginY={2}
            borderRadius={6}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            display="flex"
            sx={{
                backgroundColor:'rgba(0, 0, 0, 0.7)',
                boxShadow: '0px 4px 10px 0px rgba(255, 255, 255, 0.85)',
                color:"white"
            }}>
                <Typography fontSize={25}>Welcome to our Chat Support service! </Typography>
                <Typography fontSize={25}>Please login or sign up using the buttons above</Typography>
                <Typography fontSize={25}>We hope you will have all your questions answered</Typography>
            </Box>
            
        </Box>
       
    )
  }
  