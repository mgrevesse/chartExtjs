/**
 * Description
 */
Ext.define( 'OChart.example.SharedStore', {
    extend: 'Ext.panel.Panel',
    requires: [
        'OChart.example.TaskModel',
        'OChart.example.CustomTemplate'
    ],
    id:'SharedStore',
    layout: 'border',

    initComponent: function(){
        var me = this;

        me.store = Ext.create('Ext.data.TreeStore',{
            autoLoad: true,
            model: 'OChart.example.TaskModel',
            root: {
                id: 'root',
                "name": "Component Project",
                "duration": 111,
                "startDate": "2014-04-27 08:00:00",
                "endDate": "2014-10-01 17:00:00",
                "leaf": false,
                expanded: true
            },
            proxy: {
                type: 'ajax',
                url: 'example/project1.json'
            }
        });

        Ext.apply(me,{
            items: [
                {
                    xtype: 'treepanel',
                    title: 'Vertical Tree View',
                    layout: 'fit',
                    region: 'west',
                    flex: 0.3,
                    displayField: 'name',
                    split: true,
                    collapsible: true,
                    rootVisible: false,
                    viewConfig: {
                        plugins:{
                            ptype: 'treeviewdragdrop',
                            ddGroup: 'ochart-dd'
                        }
                    },
                    store: me.store
                },
                {
                    xtype: 'ochartcustom',
                    region: 'center',
                    store: me.store,
                    autoDestroyStore: true
                }
            ]
        });
        me.callParent( arguments );
    }
} );