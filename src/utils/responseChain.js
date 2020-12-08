function ResponseChain(fn){
	this.fn = fn
	this.success = null
}
ResponseChain.prototype.setNext = function(success_fn){
	return this.success = success_fn
}
ResponseChain.prototype.transmit = function(){
	var 
		ret = this.fn.apply(this,arguments)
	if(ret==="next"){
		if (this.success) {
			return this.success.transmit.apply(this.success,arguments)
		} else {
			return true
		}
	}
	return ret
}
ResponseChain.prototype.next = function(){
	return this.success&&this.success.transmit.apply(this.success,arguments)
}

export default ResponseChain