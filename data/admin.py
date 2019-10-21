from django.contrib import admin
from data.models import *

from import_export.admin import ExportMixin
from import_export.widgets import ForeignKeyWidget
from import_export import fields, resources

# Register your models here.


class QuizDataResource(resources.ModelResource):
    code = fields.Field(attribute='code', column_name='code', widget=ForeignKeyWidget(LabCode, 'code'))

    class Meta:
        model = QuizData

@admin.register(QuizData)
class QuizDataAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = QuizDataResource
    list_display = ('id', 'lab_data', "code", "date", "seconds_taken", "grade")
    list_filter = ('code',)




@admin.register(SurveyData)
class SurveyDataAdmin(ExportMixin, admin.ModelAdmin):
    list_display = ('id','lab_data', "code", "date", "seconds_taken")
# To remove delete option in admin panel
    # def has_delete_permission(self, request, obj=None):
    # return False
