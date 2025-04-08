import { NEXT_PUBLIC_LIVEKIT_URL, NEXT_PUBLIC_TOKEN_URL } from "@/constant/URL";
import { useStateContext } from "@/contexts/StateContact";
import { useState, useEffect } from "react";

const TOKEN_URL = NEXT_PUBLIC_TOKEN_URL as string;
const LIVEKIT_URL = NEXT_PUBLIC_LIVEKIT_URL as string;

const useConnect = () => {
    const [token, setToken] = useState<string | null>(null);
    const [identity, setIdentity] = useState<string | null>(null);
    const [wsUrl, setWsUrl] = useState<string | null>(LIVEKIT_URL);
    const [loading, setLoading] = useState<boolean>(true);
    const { finalPrompt,candidateName } = useStateContext();


    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch(`${TOKEN_URL}?prompt=${finalPrompt}&name=${candidateName}`);
                if (!response.ok) throw new Error("Failed to fetch token");
                const res = await response.json() as any;
                setToken(res.accessToken);
                setIdentity(res.identity);
            } catch (error) {
                console.error("Error fetching token:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, []);

    return { token, wsUrl, loading, identity };
};

export default useConnect;
