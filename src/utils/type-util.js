let Type = {}
for(let i = 0, type; type = ['String', 'Array', 'Number','Function'][i++];) {
	Type['is' + type] = (obj) => {
		return Object.prototype.toString.call(obj) === '[object ' + type + ']'
	}
}

export default Type