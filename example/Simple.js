/**
 * A simple example
 */
Ext.define( 'OChart.example.Simple', {
    extend: 'Ext.panel.Panel',
    layout: 'fit',

    requires: [
        'Ext.ux.ochart.OChartDragDrop',
        'Ext.ux.ochart.OChart'
    ],

    autoDestroyStore: true,

    initComponent: function(){
        var me = this;

        if(!me.store){
            me.store = Ext.create('OChart.example.NodesStore');
        }


        me.chartConfig = me.chartConfig || {};

        Ext.applyIf(me.chartConfig,{
            xtype: 'ochart',
            autoScroll : true,
            simpleSelect: true,
            rootVisible: false,
            store: me.store,
            plugins    : [
                {
                    ptype          : 'ochartdragdrop',
                    allowParentInserts: true,
                    containerScroll: true,
                    ddGroup: 'ochart-dd'
                }
            ],

            listeners: {
                scope: me,
                additem: me.onAddItem,
                removeitem: me.onRemoveItem,
                itemdblclick: me.onItemDblClick
            }
        });

        Ext.apply(me, {
            items: me.chartConfig
        });
        me.callParent( arguments );
    },

    onRender: function(){
        var chart = this.down('ochart' ),
            view = this.up('viewport');

        chart.lineWeight = view.lineWeight;
        chart.lineColor = '#' + view.lineColor;
        chart.levelSpacing = view.levelSpacing;
        chart.nodeSpacing = view.nodeSpacing;
        chart.readOnly = view.readOnly;
        chart.rootVisible = view.rootVisible;
        chart.allowContainerDrop = view.allowContainerDrop;
        chart.toolsVisible = view.toolsVisible;

        this.callParent(arguments);
    },

    afterRender: function(){
        var me = this,
            view = me.up('#mainView');
        me.mon(view,'changelineweight', me.onChangeLineWeight, me);
        me.mon(view,'changelinecolor', me.onChangeLineColor, me);
        me.mon(view,'changelevelspace', me.onChangeLevelSpace, me);
        me.mon(view,'changeitemspace', me.onChangeItemSpace, me);
        me.mon(view,'changereadonly', me.onChangeReadOnly, me);
        me.mon(view,'changerootvisible', me.onChangeRootVisible, me);
        me.mon(view,'changecontainerdrop', me.onChangeContainerDrop, me);
        me.mon(view,'changetools', me.onChangeTools, me);
        me.view = view;
        me.callParent(arguments);
    },

    onDestroy: function(){
        var me = this,
            view = me.view;
        me.mun(view,'changelineweight', me.onChangeLineWeight, me);
        me.mun(view,'changelinecolor', me.onChangeLineColor, me);
        me.mun(view,'changelevelspace', me.onChangeLevelSpace, me);
        me.mun(view,'changeitemspace', me.onChangeItemSpace, me);
        me.mun(view,'changereadonly', me.onChangeReadOnly, me);
        me.mun(view,'changerootvisible', me.onChangeRootVisible, me);
        me.mun(view,'changecontainerdrop', me.onChangeContainerDrop, me);
        me.mun(view,'changetools', me.onChangeTools, me);
        me.view = null;
        if(me.autoDestroyStore){
            me.store.destroyStore();
        }
        me.store = null;
        me.callParent(arguments);
    },

    onItemDblClick: function(view, record, item, index, e){
        if(view.readOnly) return;

        Ext.Msg.prompt('Edit Node', 'Type the node name',function(btn, text){
            if(btn == 'ok'){
                record.set('text',text);
            }
        }, window, false, record.get('text'));
    },

    onAddItem: function (view, record, where, nodeEl){
        Ext.Msg.prompt('New Node', 'Type the node name',function(btn, text){
            if(btn == 'ok'){
                var newrec = {text: text, leaf: true};
                switch(where){
                    case 'before':
                        var parent = record.parentNode;
                        newrec = parent.insertBefore(newrec, record);
                        break;
                    case 'after':
                        var node = record.nextSibling;
                        var parent = record.parentNode;
                        newrec = parent.insertBefore(newrec, node);
                        break;
                    case 'child':
                        newrec = record.appendChild(newrec);
                        record.expand(function(){view.focusNode(newrec);});
                        break;
                }
            }
        });
    },

    onRemoveItem: function(view, record, nodeEl){
        Ext.Msg.confirm('Remove Item', 'Do you really want\'s remove this items?',function(btn, text){
            if(btn == 'yes'){
                record.remove();
            }
        });
    },

    onChangeLineWeight: function(panel, weight){
        var chart = this.down('ochart');
        chart.lineWeight = weight;
        chart.refresh();
    },

    onChangeLineColor: function(panel, color){
        var chart = this.down('ochart' );
        chart.lineColor =  '#' + color;
        chart.refresh();
    },

    onChangeLevelSpace: function(panel, space){
        var chart = this.down('ochart');
        chart.levelSpacing = space;
        chart.refresh();
    },

    onChangeItemSpace: function(panel, space){
        var chart = this.down('ochart');
        chart.nodeSpacing = space;
        chart.refresh();
    },

    onChangeReadOnly: function(panel, value){
        var chart = this.down('ochart');
        chart.readOnly = value;
    },

    onChangeRootVisible: function(panel, value){
        var chart = this.down('ochart');
        chart.rootVisible = value;
        chart.refresh();
    },

    onChangeContainerDrop: function(panel, value){
        var chart = this.down('ochart');
        chart.allowContainerDrop = value;
    },

    onChangeTools: function(panel, value){
        var chart = this.down('ochart');
        chart.toolsVisible = value;
    }
} );