import { Dispatch, SetStateAction } from 'react';
import { getNews } from '../services/newService';


export const startNews = async (setState: Dispatch<SetStateAction<any>>) => {
    const news = await getNews();
    if (news.data) {
        setState((prevState: any) => ({
            ...prevState,
            news: news.data,
            newsFilter: news.data,
        }))
    }
}