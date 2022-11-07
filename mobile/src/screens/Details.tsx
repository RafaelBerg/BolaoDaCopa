import { useEffect, useState } from "react"
import { Share } from "react-native"
import { HStack, useToast, VStack } from "native-base";
import { useRoute } from "@react-navigation/native"

import { api } from "../services/api"

import { Option } from "../components/Option"; 
import { Header } from "../components/Header";
import { Guesses } from "../components/Guesses"; 
import { Loading } from "../components/Loading";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { PoolCardProps } from "../components/PoolCard"
import { PoolHeader } from "../components/PoolHeader";


interface RouteParams {
    id: string
}

export function Details() {
    const [optionSelected, setOptionSelected] = useState<"palpites" | "ranking">("palpites")
    const [isLoading, setIsLoading] = useState(true)
    const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps)

    const route = useRoute()
    const toast = useToast()

    const { id } = route.params as RouteParams

    async function fetchPoolDetails(){
        try{
            setIsLoading(true)

            const response = await api.get(`/pools/${id}`)
            setPoolDetails(response.data.pool)
        }
        catch(err){
            console.log(err)

            toast.show({
                title: "Não foi possivel carregar os detalhes do bolão",
                placement: "top",
                bgColor: "red.500"
            })
        }
        finally{
            setIsLoading(false)
        }
    }

    async function handleCodeShare(){
        await Share.share({
            message: poolDetails.code
        })
    }

    useEffect(() => {
        fetchPoolDetails()
    },[id])

    if(isLoading){
        return <Loading />
    }

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header 
                title="Título do Bolão" 
                showBackButton 
                showShareButton
                onShare={handleCodeShare}
        />
        
            {
                poolDetails._count?.participants > 0 ? 
                <VStack flex={1} px={5}>
                    <PoolHeader data={poolDetails}/>

                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option 
                            title="Seus palpites" 
                            isSelected={optionSelected === "palpites"}
                            onPress={() => setOptionSelected("palpites")}
                        />
                        <Option 
                            title="Ranking do grupo" 
                            isSelected={optionSelected === "ranking"}
                            onPress={() => setOptionSelected("ranking")}
                    />
                    </HStack>

                    <Guesses poolId={poolDetails.id} code={poolDetails.code}/>

                </VStack>
                : <EmptyMyPoolList code={poolDetails.code}/>
            }
        </VStack>
    )
}