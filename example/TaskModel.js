Ext.define( 'OChart.example.TaskModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
        {name: 'duration', type: 'float'},
        {name: 'startDate', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'endDate', type: 'date', dateFormat: 'Y-m-d H:i:s'}
    ]
} );