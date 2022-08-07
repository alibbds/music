export const whenKeepAliveStopWatch =   {
    data() {
        return {
            activatedFlag: false,
        };
    },
    mounted() {
        
        this.activatedFlag = true;
    },
    
    activated() {
        this.activatedFlag = true;
    },
    deactivated() {
        this.activatedFlag = false;
    },
}