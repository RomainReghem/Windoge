import { Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Dossier = () => {
    const [searchParams] = useSearchParams();
    const [name, setName] = useState("Firstname Lastname");
    const [data, setData] = useState();
    useEffect(() => {
        fetch(`https://fhir.alliance4u.io/api/patient`)
            .then(response => response.json())
            .then(data => setData(data.filter(element => element.id == searchParams.get('ref'))[0]));
    }, [])

    useEffect(() => {
        console.log(data)
        if (data?.name) {
            console.log(data.name)
            try {
                setName(`${data.name[0].given} ${data.name[0].family}`)
            } catch (error) {}
        }
    }, [data])

    return (
        <>
            <Heading>{name}</Heading>
            <Text>{searchParams?.get("ref")}</Text>
        </>

    )
}

export default Dossier;