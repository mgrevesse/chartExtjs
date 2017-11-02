/**
 * A simple example
 */
Ext.define( 'OChart.example.CustomTemplate', {
    extend: 'OChart.example.Simple',
    requires: 'OChart.example.TaskModel',
    alias: 'widget.ochartcustom',

    initComponent: function(){
        var me = this;

        me.store = me.store || Ext.create('Ext.data.TreeStore',{
            model: 'OChart.example.TaskModel',
            root: {
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

        me.chartConfig = me.chartConfig || {};
        Ext.applyIf(me.chartConfig, {
            itemTpl: [
                '<div class="item-title">{name}</div>',
                '<div class="item-body">',
                    '<div class="item-label">',
                        'Start date:<br/>',
                        'End date:<br/>',
                        'Duration:',
                    '</div>',
                    '<div class="item-value">',
                        '{startDate:date}<br/>',
                        '{endDate:date}<br/>',
                        '{duration} {[values.duration != 1 ? "days" : "day"]}',
                    '</div>',
                '</div>'
            ],

            itemCls: 'task-item'
        });

        me.callParent( arguments );
    },

    onItemDblClick: Ext.emptyFn
} );