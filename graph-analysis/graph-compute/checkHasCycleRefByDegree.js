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


  function checkCycleByDegree(allNodes) {
      // 初始化节点
      var container = {}
      for (var node of allNodes) {
          var n = {
              id: node.id,
              indegree: 0,
              outdgree: 0,
              inNodes: []
          }
          container[node.id] = n
      }
      //  初始化出度,并且构建反向引用inNodes,到父节点.
      for (var node of allNodes) {
          container[node.id].outdgree = node.wires[0].length
          for (var i in node.wires) {
              for (var e of node.wires[i]) {
                  container[e].inNodes.push(container[node.id])
              }
          }
      }

      var lastCount = 0
      do {
          lastCount = Object.keys(container).length //元素个数
          for (var i in container) {
              if (container[i].outdgree === 0) {
                  for (parent of container[i].inNodes) {
                      parent.outdgree--
                  }
                  delete container[i]
              }
          }

      } while (lastCount !== Object.keys(container).length)

      if (lastCount === 0) {
          return false
      } else {
          return true
        }
    }
    // main
    if(checkCycleByDegree(allNodes)){
        console.log('has cycle ref')
    }else{
        console.log('no cycle refs')
  }