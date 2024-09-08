from django.db import models


class Station(models.Model):
    STATION_TYPES = [
        ('major_hub', 'Major Hub'),
        ('regional', 'Regional'),
        ('local', 'Local'),
    ]
    
    station_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    total_floors = models.IntegerField()
    station_type = models.CharField(max_length=50, choices=STATION_TYPES)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.station_name
    

class StationFacility(models.Model):
    FACILITY_TYPES = [
        ('service', 'Service'),
        ('dining', 'Dining'),
        ('restroom', 'Restroom'),
        # Add more facility types as needed
    ]
    
    station = models.ForeignKey(Station, on_delete=models.CASCADE, related_name='facilities')
    facility_name = models.CharField(max_length=255)
    facility_type = models.CharField(max_length=50, choices=FACILITY_TYPES)
    floor_level = models.IntegerField()
    coordinates = models.CharField(max_length=255)  # Format: "X,Y,Z"
    operational_hours = models.CharField(max_length=255)  # Example: "9 AM - 9 PM"
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.facility_name} in {self.station.station_name}"



class AccessibilityFeature(models.Model):
    facility = models.ForeignKey(StationFacility, on_delete=models.CASCADE, related_name='accessibility_features')
    accessibility_type = models.CharField(max_length=255)  # Example: "Ramp", "Braille Signage"
    description = models.TextField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.accessibility_type} for {self.facility.facility_name}"
    

class StationLayout(models.Model):
    station = models.ForeignKey(Station, on_delete=models.CASCADE, related_name='layouts')
    layout_name = models.CharField(max_length=255)  # Example: "Main Floor Layout"
    map_data = models.FileField(upload_to='station_layouts/')  # This stores the map file
    floor_level = models.IntegerField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Layout {self.layout_name} for {self.station.station_name}"


