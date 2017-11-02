Ext.define( 'OChart.example.NodesStore', {
    extend: 'Ext.data.TreeStore',

    fields:[
        {name: 'text'},
    ],
    proxy: {
        type: 'ajax',
        url: 'example/nodes.json'
    }
} );