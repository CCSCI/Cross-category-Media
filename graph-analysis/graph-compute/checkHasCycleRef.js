 /**
  * 从全部节点里找出来ID为 id 的节点.
  * @param {*} all 全部节点. 
  * @param {*} id  节点ID.
  */
 const getNode = (all, id) => {
     for (var i of all) {
         if (i.id === id) {
             return i
         }
     }
 }
 /**
  * 
  * @param {*} node 获取节点的wires 属性里的内容. 
  */
 const getWires = (node) => {
    let w = node.wires || []
    let p = []
    for (var va of w) {
        for (var e of va) {
            p.push(e)
        }
    }
    return p
}
/**
 * 
 * @param {*} node  节点
 * @param {*} label  label
 * @param {*} all  全部节点.
 */
 const recurCheckLabel = (node, label, all) => {
     let id = node.id
     let w = getWires(node)
     label[id] = true
     for (var n of w) {
         if (label[n]) {
             return true
         }
         label[n] = true
         if (recurCheckLabel(getNode(all, n), Object.assign({}, label), all)) {
             return true
         }
     }
     return false
 }
 /**
  * 
  * @param {*} all 全部节点 
  */
 const checkHasCycleRef = (all) => {
     for (var node of all) {
         if (recurCheckLabel(node, {}, all)) {
             return true
         }
     }
     return false
 }

 /**
  * load demo.
  */
 const allNodes = [{
     "id": "e271e8fb.76d348",
     "type": "join",
     "z": "5b85d03b.1c1a6",
     "name": "3",
     "mode": "auto",
     "build": "string",
     "property": "payload",
     "propertyType": "msg",
     "key": "topic",
     "joiner": "\\n",
     "joinerType": "str",
     "accumulate": false,
     "timeout": "",
     "count": "",
     "reduceRight": false,
     "reduceExp": "",
     "reduceInit": "",
     "reduceInitType": "",
     "reduceFixup": "",
     "x": 437,
     "y": 308,
     "wires": [
         ["b3b444c6.ed3ae8", "6e2be927.fb3278"]
     ]
 }, {
     "id": "6e2be927.fb3278",
     "type": "change",
     "z": "5b85d03b.1c1a6",
     "name": "4",
     "rules": [{
         "t": "set",
         "p": "payload",
         "pt": "msg",
         "to": "",
         "tot": "str"
     }],
     "action": "",
     "property": "",
     "from": "",
     "to": "",
     "reg": false,
     "x": 327,
     "y": 520,
     "wires": [
         ["ea424d25.22928"]
     ]
 }, {
     "id": "ea424d25.22928",
     "type": "split",
     "z": "5b85d03b.1c1a6",
     "name": "5",
     "splt": "\\n",
     "spltType": "str",
     "arraySplt": 1,
     "arraySpltType": "len",
     "stream": false,
     "addname": "",
     "x": 543,
     "y": 518,
     "wires": [
         ["e271e8fb.76d348"]
     ]
 }, {
     "id": "83b4092a.d33fa8",
     "type": "function",
     "z": "5b85d03b.1c1a6",
     "name": "1",
     "func": "\nreturn msg;",
     "outputs": 1,
     "noerr": 0,
     "x": 243,
     "y": 186,
     "wires": [
         ["e271e8fb.76d348"]
     ]
 }, {
     "id": "b3b444c6.ed3ae8",
     "type": "function",
     "z": "5b85d03b.1c1a6",
     "name": "2",
     "func": "\nreturn msg;",
     "outputs": 1,
     "noerr": 0,
     "x": 614,
     "y": 184,
     "wires": [
         []
     ]
 }]

 console.log(checkHasCycleRef(allNodes))