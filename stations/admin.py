from django.contrib import admin
from .models import Station, StationFacility, AccessibilityFeature, StationLayout

# Registering the Station model
@admin.register(Station)
class StationAdmin(admin.ModelAdmin):
    list_display = ('station_name', 'location', 'total_floors', 'station_type', 'last_updated')
    search_fields = ('station_name', 'location')
    list_filter = ('station_type',)
    ordering = ('station_name',)

# Registering the StationFacility model
@admin.register(StationFacility)
class StationFacilityAdmin(admin.ModelAdmin):
    list_display = ('facility_name', 'station', 'facility_type', 'floor_level', 'operational_hours', 'last_updated')
    search_fields = ('facility_name', 'station__station_name')
    list_filter = ('facility_type', 'floor_level')
    ordering = ('station', 'facility_name')

# Registering the AccessibilityFeature model
@admin.register(AccessibilityFeature)
class AccessibilityFeatureAdmin(admin.ModelAdmin):
    list_display = ('accessibility_type', 'facility', 'description', 'last_updated')
    search_fields = ('accessibility_type', 'facility__facility_name')
    ordering = ('facility', 'accessibility_type')

# Registering the StationLayout model
@admin.register(StationLayout)
class StationLayoutAdmin(admin.ModelAdmin):
    list_display = ('layout_name', 'station', 'floor_level', 'last_updated')
    search_fields = ('layout_name', 'station__station_name')
    ordering = ('station', 'floor_level')
