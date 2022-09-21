import { Center, Heading, Text, Stack, Input, Button, FormLabel, useToast, Divider, Image, useColorModeValue } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useDragControls } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleRight, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";


const Home = () => {
    const controls = useDragControls()
    const constraintsRef = useRef(null)

    const toast = useToast()
    const navigate = useNavigate()
    return (
        <>
            <Center h={'100%'} flexDirection={['column', 'row']} gap={'6'} ref={constraintsRef}>
                <motion.div drag={true} dragConstraints={constraintsRef} animate={{
                    y: [-20, 20, -20],
                    rotate: [2, -2, 2]
                }} transition={{ duration: 3, repeat: Infinity }}><Image id='halo' zIndex={1} w='80px' transform='auto' translateY='30px' translateX= '5px' opacity={useColorModeValue(0,1)}   src='src\assets\halo_doge.png' /><Image zIndex={1} h={'130px'} src='src\assets\chien.png' /></motion.div>
                <Stack alignItems={'center'} p='4'>
                    <Stack marginBottom={'0.5em'} alignItems='center'>
                        <Heading> Welcome to Windoge 5</Heading>
                        <Heading fontWeight={'600'} fontSize={'xl'}>Your trusty link with your patients</Heading>
                    </Stack>
                    <Divider w={'50%'}></Divider>
                    <Stack direction='column' w={'xs'}>
                        <Text fontWeight={'600'}>Username</Text>
                        <Input variant='filled' placeholder='Enter your username'></Input>
                        <Text fontWeight={'600'}>Password</Text>
                        <Input variant='filled' placeholder='Enter your password'></Input>
                    </Stack>
                    <Stack width='xs'>
                        <Button
                            rightIcon={<FontAwesomeIcon icon={faCircleRight} />}
                            colorScheme={'green'}
                            onClick={() => {
                                toast({
                                    title: 'You have successfully logged in',
                                    description: "Welcome dear practician",
                                    status: 'success',
                                    duration: 9000,
                                    position: 'top-right',
                                    isClosable: true,
                                });
                                navigate('/patients')
                            }}
                        >
                            Log In
                        </Button>
                    </Stack>
                </Stack>
                <motion.div drag={true} dragConstraints={constraintsRef} animate={{
                    y: [-20, 20, -20],
                    rotate: [-2, 2, -2]
                }} transition={{ duration: 3, repeat: Infinity }}><Image id='halo' zIndex={1} w='80px' transform='auto' translateY='30px' translateX= '5px' opacity={useColorModeValue(0,1)}   src='src\assets\halo_doge.png' /><Image transform={'scaleX(-1)'} h={'130px'} src='src\assets\chien.png' /></motion.div>
            </Center>
        </>
    )
}

export default Home;