import { Badge, Button, Center, Divider, Heading, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Dossier = () => {
    const [searchParams] = useSearchParams();
    const [name, setName] = useState("Firstname Lastname");
    const [data, setData] = useState();
    const [observations, setObservations] = useState();

    // l'ID du médecin Tina
    const refMedecin = "7"

    const [obsText, setObsText] = useState("");
    const [obsValue, setObsValue] = useState(0);
    const [obsUnit, setObsUnit] = useState("");

    useEffect(() => {
        fetch(`https://fhir.alliance4u.io/api/patient`)
            .then(response => response.json())
            .then(data => setData(data.filter(element => element.id == searchParams.get('ref'))[0]));

        loadObservations();
    }, [])

    useEffect(() => {
        console.log(data)
        if (data?.name) {
            try {
                setName(`${data.name[0].given} ${data.name[0].family}`)
            } catch (error) { }
        }
    }, [data])

    const loadObservations = () => {
        fetch(`https://fhir.alliance4u.io/api/observation?subject.reference=Patient/${searchParams?.get("ref")}`)
            .then(response => response.json())
            .then(data => setObservations(data));
    }

    const handleSendObservation = async () => {
        if (obsText) {
            try {
                const rawResponse = await fetch('https://fhir.alliance4u.io/api/observation', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            resourceType: "Observation",
                            code: {
                                coding: [
                                    {
                                        display: obsText,
                                    }
                                ]
                            },
                            subject: {
                                reference: `Patient/${searchParams?.get("ref")}`,
                                display: name
                            },
                            issued: new Date(),
                            performer: [
                                {
                                    reference: `Practitioner/${refMedecin}`,
                                    display: "Dr Tina Nomena Nantenaina"
                                }
                            ],
                            valueQuantity: {
                                value: parseInt(obsValue),
                                unit: obsUnit && obsUnit,
                            },
                        }
                    )
                });
                console.log(rawResponse)
                loadObservations();
            }
            catch (error) {
                console.log("erreur d'envoi d'observation")
            }
        }
    }

    return (
        <>
            <Center p={4} flexDirection={'column'} flexGrow={1}>
                <Stack w={['xs', 'lg']} gap={2}>
                    <Stack alignItems={'center'}>
                        <Heading>{name}</Heading>
                        <Text>{searchParams?.get("ref")}</Text>
                    </Stack>

                    <Divider></Divider>

                    <Stack>
                        <Stack>
                            <Heading fontSize={'xl'}>Informations</Heading>
                            <Text>Gender : </Text>
                            <Text>Date of birth : </Text>
                            <Text>Adresse : </Text>
                            <Text>Téléphone : </Text>
                            <Text>Email : </Text>
                        </Stack>

                        <Divider></Divider>

                        <Stack>
                            <Heading fontSize={'xl'}>Observations</Heading>
                            <Textarea onChange={(e) => { setObsText(e.target.value) }} placeholder="Description de l'observation">
                            </Textarea>
                            <Stack direction={'row'}>
                                <Input placeholder="valeur" type={'number'} onChange={(e) => { setObsValue(e.target.value) }}></Input>
                                <Input placeholder='unité' onChange={(e) => { setObsUnit(e.target.value) }}></Input>
                            </Stack>
                            <Button onClick={handleSendObservation} colorScheme={'green'}>Envoyer</Button>
                            {
                                observations?.map((element, index) => {
                                    try {
                                        return (
                                            <>
                                                <span key={index}>
                                                    <Badge colorScheme={'celadon'}>
                                                        Observation {index + 1} {element?.performer?.map((e) => `par ${e.display}`)}
                                                    </Badge>
                                                    <Text>
                                                        {element.code?.coding[0].display} : {element.valueQuantity?.value}{element.valueQuantity?.unit}
                                                    </Text>
                                                </span>
                                            </>
                                        )
                                    } catch (error) {
                                        console.error("problème de formattage dans les observations")
                                    }
                                })
                            }
                        </Stack>
                    </Stack>

                </Stack>
            </Center>

        </>

    )
}

export default Dossier;