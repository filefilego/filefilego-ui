import axios from 'axios';

const endpoint = "http://127.0.0.1:9036/rpc"

export async function callJsonRpc2Endpoint(method, params) {
    return await axios.post(endpoint, {
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: 1
    })
}