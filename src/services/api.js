import api from '../utils/axios.instance';

export const getdata = async () => {
    try {
        const res = await api.get(`data`);
        return res?.data;
    } catch (error) {
       return null;
    }
};

export const postdata = async (data) => {
    try {
        const res = await api.post(`post`, data);
        return res?.data;
    } catch (error) {
       return null;
    }
};
