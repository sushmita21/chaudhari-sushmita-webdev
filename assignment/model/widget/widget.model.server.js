/**
 * Created by ch_su_000 on 07/06/2017.
 */
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server')
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
modules.export = widgetModel;

widgetModel.createWidget= createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.sortWidget = sortWidget;