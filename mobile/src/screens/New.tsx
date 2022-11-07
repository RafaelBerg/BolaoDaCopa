import { useState } from "react"
import { Heading, VStack, Text, useToast } from "native-base";

import Logo from "../assets/logo.svg"

import { api } from "../services/api"

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function New(){
    const [title, setTitle] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()

    async function handlePoolCreate(){
        console.log(!title.trim())
        if(!title.trim()){
            return toast.show({
                title: "Informe um nome para o seu bolão!",
                placement: "top",
                bgColor: "red.500"
            })   
        }

        try{
            setIsLoading(true)
            
            await api.post("/pools", {title: title})

            toast.show({
                title: "Bolão criado com sucesso!",
                placement: "top",
                bgColor: "green.500"
            })  
            
            setTitle("")
        }
        catch(err){
            console.log(err)

            toast.show({
                title: "Informe um nome para o seu bolão!",
                placement: "top",
                bgColor: "red.500"
            })   
        }
        finally{
            setIsLoading(false)
        }

    }

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header onShare={null} title="Criar novo Bolão" />
            <VStack mt={8} mx={5} alignItems="center">
                <Logo />

                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Crie seu próprio bolão da copa {"\n"} e compartilhe com os amigos!
                </Heading>

                <Input 
                    mb={2}
                    placeholder="Qual o nome do seu Bolão?"
                    onChangeText={setTitle}
                    value={title}
                />

                 <Button 
                    title="Criar meu Bolão"
                    onPress={handlePoolCreate}
                    isLoading={isLoading}
                 />
                    
                <Text color="gray.200" fontSize="sm" textAlign="center" px="10" mt="4">
                    Após criar seu bolão, você receberá um código único
                    que poderá usar para convidar outras pessoas.
                </Text>
            </VStack>
        </VStack>
    )
}