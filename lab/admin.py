from django.contrib import admin
from .models import *

from import_export.admin import ExportMixin
from import_export.widgets import ForeignKeyWidget
from import_export import fields, resources

# Register your models here.
@admin.register(LabCode)
class LabCodeAdmin( admin.ModelAdmin ):
    list_display = ('id', 'code', 'date', 'content_access', 'quiz_access', 'content_time', 'test')

class LabProgressResource(resources.ModelResource):
    code = fields.Field(attribute='code', column_name='code', widget=ForeignKeyWidget(LabCode, 'code'))

    class Meta:
        model = LabProgress

@admin.register(LabProgress)
class LabProgressAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = LabProgressResource
    list_display = ('id', 'session', 'date', 'code', 'instructions', 'consent', 'group', 'content', 'quiz', 'survey','withdraw')
    list_filter = ('code','date')


# To remove delete option in admin panel
    # def has_delete_permission(self, request, obj=None):
    # return False
