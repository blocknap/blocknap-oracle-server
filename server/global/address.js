

exports.add = function(address,oracle,abi) {
    var allAddress = global.allAddress;
    allAddress.push({"address":address,"oracle":oracle,"abi":JSON.stringify(abi)});
}