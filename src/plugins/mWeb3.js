import Web3 from "web3";
import { EthereumProvider } from '@walletconnect/ethereum-provider'

const mWeb3Plugins = {
    opts:{
        instance: null,
        Provider: null,
        address: '',
        chainId: '',
    },
    install(app, options){
        app.config.globalProperties.$web3 = this.opts;
        app.config.globalProperties.$web3.connect = (args)=> this.connect(args)
        app.config.globalProperties.$web3.personalSign = this.personalSign.bind(this)
    },
    async connect(args){
        const {app, options, maxRetries = 3, retryDelay = 2000,accountsChanged,chainChanged,disconnect} = args || {}
        let retryCount = 0;

        while (retryCount < maxRetries) {
            try {
                if(!this.opts.Provider){
                    if(!window.ethereum) {
                        this.opts.Provider = await this.walletconnect();
                    }else {
                        this.opts.Provider = window.ethereum;
                    }
                }

                if(!window.ethereum){
                    // console.log('connected0-----',EthereumProvider.connected)
                    // const accounts = await this.opts.Provider.enable()
                    // console.log('this.opts.Provider-1-',accounts)
                    if(!EthereumProvider.connected){
                        await this.opts.Provider.connect()
                    }
                    // await this.opts.Provider.connect()
                }

                this.opts.instance = new Web3(this.opts.Provider)
                const result = await this.opts.Provider.request({
                    method: "eth_requestAccounts",
                });
                this.opts.chainId = await this.opts.instance.eth.getChainId()
                this.opts.chainId = parseInt(this.opts.chainId)

                this.opts.address = result[0];
                this.accountsChanged(accountsChanged || options.accountsChanged)
                this.chainChanged(chainChanged || options.chainChanged)
                this.disconnect(disconnect || options.disconnect)
                return {success:true,address:this.opts.address};
            } catch (e) {
                retryCount++;
                if (retryCount === maxRetries) {
                    this.handleError('connect',e)
                    return {success:false};
                }
                await new Promise((resolve) => setTimeout(resolve, retryDelay));

            }
        }
    },
    async walletconnect(){
        return EthereumProvider.init({
            projectId:'94fe78400a0ac4fad3d8d9f71b9a865d',
            showQrModal: true,
            qrModalOptions: {themeMode: "light"},
            chains: [42161],
            enableAuthMode: true
        });
    },
    accountsChanged(callback){
        this.opts.Provider.on("accountsChanged", ([address])=>{
            console.log('accountsChanged--1-',this.opts.address)
            console.log('accountsChanged--2-',address)
            if(!!this.opts.address && address != this.opts.address){
                window.location.reload()
            }
            this.opts.address = address || ''
            callback & callback(address);
        });
    },
    chainChanged(callback){
        this.opts.Provider.on("chainChanged", (res)=>{
            let chainId = Web3.utils.hexToNumber(res)
            console.log('chainChanged--1-',this.opts.chainIds)
            console.log('chainChanged--2-',chainId)
            if(!!this.opts.chainId && chainId != this.opts.chainId){
                window.location.reload()
            }
            this.opts.chainId = chainId
            callback && callback(this.opts.chainId)
        });
    },
    disconnect(callback){
        this.opts.Provider.on("disconnect", ()=>{
            callback && callback()
            this.opts.address = '';
            this.opts.chainId = '';
            window.location.reload()
        });
    },
    async getAccounts(){
        try {
            const [address] = await this.opts.instance.eth.getAccounts();
            return address
        }catch (e) {
            this.handleError('getAccounts',e)
            return ''
        }
    },
    async personalSign (msg = ''){
        if(typeof msg !== 'string'){
            msg = JSON.stringify(msg);
        }
        try {
            const address = await this.getAccounts();
            const signature = await this.opts.instance.eth.personal.sign(msg, address);
            return signature
        } catch (e) {
            this.handleError('personalSign',e)
            return false;
        }
    },

    handleError(type,msg){
        window.console.error(`mWeb3 Error [${type}]:::`,msg)
    },
}

export default mWeb3Plugins