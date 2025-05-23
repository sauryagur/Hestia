import React, {useState} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Slider} from '@/components/ui/slider';
import {WeatherData} from '@/types/api';
import {Cloud, Compass, Droplet, Flag, Map, Thermometer, Wind} from 'lucide-react';

interface SimulationFormProps {
    onSubmit: (data: WeatherData) => void;
    isLoading?: boolean;
}

const SimulationForm: React.FC<SimulationFormProps> = ({onSubmit, isLoading = false}) => {
    const [formData, setFormData] = useState<WeatherData>({
        locationName: "Forest Area 1",
        latitude: 37.7749,
        longitude: -122.4194,
        temperature: 25,
        humidity: 30,
        windSpeed: 15,

        // New variables:
        cloudCover: 40,       // %
        precipitation: 5,     // mm
        windDirection: 180,   // degrees
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'locationName' ? value : parseFloat(value)
        }));
    };

    const handleSliderChange = (name: keyof WeatherData, value: number[]) => {
        setFormData(prev => ({
            ...prev,
            [name]: value[0]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Card className="shadow-lg w-full max-w-xl mx-auto">
            <CardHeader className="bg-secondary">
                <CardTitle>Fire Risk Simulation</CardTitle>
                <CardDescription>Enter environmental data to predict fire risk</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6 pt-6">
                    {/* Location */}
                    <div className="space-y-2">
                        <Label htmlFor="locationName">Location Name</Label>
                        <div className="flex space-x-2">
                            <Map className="h-5 w-5 text-muted-foreground mt-2"/>
                            <Input
                                id="locationName"
                                name="locationName"
                                value={formData.locationName}
                                onChange={handleChange}
                                className="flex-1"
                                required
                            />
                        </div>
                    </div>

                    {/* Coordinates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="latitude">Latitude</Label>
                            <Input id="latitude" name="latitude" type="number" step="0.0001" min="-90" max="90"
                                   value={formData.latitude} onChange={handleChange} required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="longitude">Longitude</Label>
                            <Input id="longitude" name="longitude" type="number" step="0.0001" min="-180" max="180"
                                   value={formData.longitude} onChange={handleChange} required/>
                        </div>
                    </div>

                    {/* Temperature */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="temperature">Temperature (°C)</Label>
                            <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">
                {formData.temperature}°C
              </span>
                        </div>
                        <div className="flex space-x-3 items-center">
                            <Thermometer className="h-5 w-5 text-fire-medium"/>
                            <Slider id="temperature" value={[formData.temperature]} min={-10} max={50} step={1}
                                    onValueChange={val => handleSliderChange('temperature', val)} className="flex-1"/>
                        </div>
                    </div>

                    {/* Humidity */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="humidity">Humidity (%)</Label>
                            <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">
                {formData.humidity}%
              </span>
                        </div>
                        <div className="flex space-x-3 items-center">
                            <Flag className="h-5 w-5 text-blue-400"/>
                            <Slider id="humidity" value={[formData.humidity]} min={0} max={100} step={1}
                                    onValueChange={val => handleSliderChange('humidity', val)} className="flex-1"/>
                        </div>
                    </div>

                    {/* Wind Speed */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="windSpeed">Wind Speed (km/h)</Label>
                            <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">
                {formData.windSpeed} km/h
              </span>
                        </div>
                        <div className="flex space-x-3 items-center">
                            <Wind className="h-5 w-5 text-muted-foreground"/>
                            <Slider id="windSpeed" value={[formData.windSpeed]} min={0} max={150} step={1}
                                    onValueChange={val => handleSliderChange('windSpeed', val)} className="flex-1"/>
                        </div>
                    </div>

                    {/* Cloud Cover */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="cloudCover">Cloud Cover (%)</Label>
                            <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">
                {formData.cloudCover}%
              </span>
                        </div>
                        <div className="flex space-x-3 items-center">
                            <Cloud className="h-5 w-5 text-sky-400"/>
                            <Slider id="cloudCover" value={[formData.cloudCover]} min={0} max={100} step={1}
                                    onValueChange={val => handleSliderChange('cloudCover', val)} className="flex-1"/>
                        </div>
                    </div>

                    {/* Precipitation */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="precipitation">Precipitation (mm)</Label>
                            <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">
                {formData.precipitation} mm
              </span>
                        </div>
                        <div className="flex space-x-3 items-center">
                            <Droplet className="h-5 w-5 text-blue-600"/>
                            <Slider id="precipitation" value={[formData.precipitation]} min={0} max={50} step={0.5}
                                    onValueChange={val => handleSliderChange('precipitation', val)} className="flex-1"/>
                        </div>
                    </div>

                    {/* Wind Direction */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="windDirection">Wind Direction (°)</Label>
                            <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">
                {formData.windDirection}°
              </span>
                        </div>
                        <div className="flex space-x-3 items-center">
                            <Compass className="h-5 w-5 text-muted-foreground"/>
                            <Slider id="windDirection" value={[formData.windDirection]} min={0} max={360} step={5}
                                    onValueChange={val => handleSliderChange('windDirection', val)} className="flex-1"/>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end bg-muted/20">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Run Simulation'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default SimulationForm;
