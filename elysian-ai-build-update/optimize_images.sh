#!/bin/bash

# Image Optimization Script for Elysian Build Website
# This script compresses images to improve loading performance

echo "🖼️  Starting image optimization..."

# Create backup directory
mkdir -p assets/images/backup
echo "📁 Created backup directory"

# Function to optimize an image
optimize_image() {
    local file="$1"
    local backup_file="assets/images/backup/$(basename "$file")"
    
    # Create backup
    cp "$file" "$backup_file"
    echo "💾 Backed up: $(basename "$file")"
    
    # Get original size
    local original_size=$(stat -f%z "$file" 2>/dev/null || echo "0")
    
    # Optimize the image
    sips -s format jpeg -s formatOptions 70 -Z 1200 "$file" --out "$file" > /dev/null 2>&1
    
    # Get new size
    local new_size=$(stat -f%z "$file" 2>/dev/null || echo "0")
    
    # Calculate savings
    if [ "$original_size" -gt 0 ] && [ "$new_size" -gt 0 ]; then
        local savings=$((original_size - new_size))
        local percent=$((savings * 100 / original_size))
        echo "✅ Optimized: $(basename "$file") - Saved ${percent}% (${savings} bytes)"
    else
        echo "✅ Processed: $(basename "$file")"
    fi
}

# Find and optimize all images
echo "🔍 Finding images to optimize..."

# Optimize service images
if [ -d "assets/images/services" ]; then
    echo "📸 Optimizing service images..."
    for file in assets/images/services/*.jpg assets/images/services/*.jpeg assets/images/services/*.png; do
        if [ -f "$file" ]; then
            optimize_image "$file"
        fi
    done
fi

# Optimize portfolio images
if [ -d "assets/images/portfolio" ]; then
    echo "📸 Optimizing portfolio images..."
    for file in assets/images/portfolio/*.jpg assets/images/portfolio/*.jpeg assets/images/portfolio/*.png; do
        if [ -f "$file" ]; then
            optimize_image "$file"
        fi
    done
fi

# Optimize project images
if [ -d "assets/images/projects" ]; then
    echo "📸 Optimizing project images..."
    for file in assets/images/projects/*.jpg assets/images/projects/*.jpeg assets/images/projects/*.png; do
        if [ -f "$file" ]; then
            optimize_image "$file"
        fi
    done
fi

# Optimize other images
echo "📸 Optimizing other images..."
for file in assets/images/*.jpg assets/images/*.jpeg assets/images/*.png; do
    if [ -f "$file" ]; then
        optimize_image "$file"
    fi
done

echo "🎉 Image optimization complete!"
echo "📊 Check the backup directory for original files if needed"
echo "🚀 Images should now load much faster!"
