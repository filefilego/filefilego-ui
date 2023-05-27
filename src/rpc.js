import axios from 'axios';

const localNodeEndpoint = "http://127.0.0.1:9036/rpc"

async function callJsonRpc2Endpoint(method, params) {
    return await axios.post(localNodeEndpoint, {
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: 1
    })
}

export { 
    localNodeEndpoint,
    callJsonRpc2Endpoint
}