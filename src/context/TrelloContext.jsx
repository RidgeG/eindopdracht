import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { TRELLO_CONFIG } from '../config';

export const TrelloContext = createContext();

export const TrelloProvider = ({ children }) => {
    const [lists, setLists] = useState([]);
    const [defaultListId, setDefaultListId] = useState(null);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get(
                    `https://api.trello.com/1/boards/GQinj4rP/lists`,
                    {
                        params: {
                            key: TRELLO_CONFIG.API_KEY,
                            token: TRELLO_CONFIG.TOKEN,
                        },
                    }
                );
                setLists(response.data);
                if (response.data && response.data.length > 0) {
                    setDefaultListId(response.data[0].id);
                }
            } catch (error) {
                console.error("Fout bij ophalen van Trello lijsten:", error);
            }
        };
        fetchLists();
    }, []);

    const createCard = async (name, desc = "", listId = defaultListId) => {
        if (!listId) throw new Error("Geen lijst-ID beschikbaar");
        try {
            const response = await axios.post(`https://api.trello.com/1/cards`, {
                name,
                desc,
                idList: listId,
                key: TRELLO_CONFIG.API_KEY,
                token: TRELLO_CONFIG.TOKEN,
            });
            return response.data;
        } catch (error) {
            console.error("Fout bij het aanmaken van een kaart:", error);
            throw error;
        }
    };

    const getCards = async (listId = defaultListId) => {
        if (!listId) throw new Error("Geen lijst-ID beschikbaar");
        try {
            const response = await axios.get(
                `https://api.trello.com/1/lists/${listId}/cards`,
                {
                    params: {
                        key: TRELLO_CONFIG.API_KEY,
                        token: TRELLO_CONFIG.TOKEN,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Fout bij het ophalen van kaarten:", error);
            throw error;
        }
    };


    const getBoardActions = async (boardId = TRELLO_CONFIG.BOARD_ID) => {
        try {
            const response = await axios.get(
                `https://api.trello.com/1/boards/GQinj4rP/actions`,
                {
                    params: {
                        key: TRELLO_CONFIG.API_KEY,
                        token: TRELLO_CONFIG.TOKEN,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Fout bij ophalen van board-acties:", error);
            throw error;
        }
    };

    return (
        <TrelloContext.Provider value={{ lists, defaultListId, createCard, getCards, getBoardActions }}>
            {children}
        </TrelloContext.Provider>
    );
};
