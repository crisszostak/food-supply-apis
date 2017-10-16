class ContainerProvider {
    static getContainer(){
        return ContainerProvider._container;
    }

    static setContainer(container){
        ContainerProvider._container = container;
    }
}

module.exports = { ContainerProvider };