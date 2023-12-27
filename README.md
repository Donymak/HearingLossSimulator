# Hearing Loss Simulator

### Introduction

Welcome to the [Hearing Loss Simulator](https://donymak.github.io/HearingLossSimulator/), an innovative application designed to provide a unique perspective on hearing impairment. This simulator is developed to help those with normal hearing experience how people with hearing loss perceive different sounds.

The application offers an experiential insight into the auditory world of hearing loss, enabling users to hear common sounds and voices as they would be experienced by someone with hearing impairment. 
It's an educational and enlightening tool, intended to foster empathy and awareness about the challenges faced by individuals with hearing loss.

Demo available [here](https://donymak.github.io/HearingLossSimulator/).

### Installation 

To run the demo locally, simply pull the repo and run the `index.html` file

## Usage

### Basic Usage
To get started with the Hearing Loss Simulator, follow these simple steps:

**Select the Main Sound:** Choose a sound from the dropdown menu that you wish to simulate hearing loss for.

**Play Main Sound:** Click the 'Play' button next to the main sound selection to start playback. By default, the sound will play using the 'Normal' Hearing preset.

**Choose a Preset:** Click on one of the preset buttons (Normal, Mild, Moderate, Severe, Vitaly Riabokon(Normalised)) to simulate different levels of hearing loss. The sound will adjust to the selected preset, allowing you to hear the difference as compared to normal hearing.

### Advanced Usage

**For users interested in a more detailed simulation:**

**Custom Audiograms**: Adjust the sliders under the frequency labels (125 Hz to 8000 Hz) to set the hearing loss level for each frequency. This can be done for each ear separately or averaged to both sides.

**Background Sound:** Select and play a background sound to understand how hearing loss affects the ability to discern main sounds amidst noise.

**Balance:** Use the balance slider to mix between the main sound and the background noise, providing a realistic scenario of trying to focus on sounds with background interference.

**Normalization:** If you create a custom audiogram where the hearing loss exceeds 55 dB, it is recommended to normalize the sound levels. This feature ensures that the simulation remains within available listening parameters due to hardware and software limitations.
> [!NOTE]
> Hardware and software limitations are max levels of reducing the loudness of the exact frequency in the results of testing this value is 55 dB. That means that setting 55 dB of loss will make sound inaudible.

**Graphical Audiogram:** As you adjust the hearing loss levels, the graphical audiogram will dynamically update to visualize the degree of hearing loss across different frequencies.


