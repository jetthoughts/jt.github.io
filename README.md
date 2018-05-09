# jetthoughts

- [How to install](#how-to-install)
- [How to use](#how-to-use)
- [How to contribute](#how-to-contribute)

## How to install

1. Clone project into your computer

1. Open project root directory

1. Install project dependencies

    ```bash
    bin/setup
    ```

## How to use

1. To run jekyll server

    ```bash
    bin/server
    ```

## How to contribute

1. Choose issue from the board

1. Create new branch for this issue

    `git checkout -b #[issue-number]-issue-name`

1. Write a good commit message based on http://chris.beams.io/posts/git-commit/ with some requirements:

        #[issue-number]: Capitalized, short (50 chars or less) summary

        More detailed explanatory ...

1. Convert an existing issue into a pull request: `hub pull-request -i [issue-number]`

## How use auto-generation of media assets:

1. Optimize images: https://tinypng.com/
    - Upload your original image (.png, jpg)
    - Click download
    - It is important that the picture is sufficiently optimized and in good quality
2. Optimize videos: https://video.online-convert.com/ or http://www.convertfiles.com/convert/video/
    We use video of two resolutions: 1920x1080 30fps, 1280x720 30fps
    And video of two formats: mp4, m4v, webm
    - Upload your original video
    - Select the desired resolution and format
    - click convert and after download
3. Generate favicons: https://www.favicon-generator.org/
    We use icons for the site size: 16x16, 32x32x 144x144
    - Upload your original image
    - Click Create Favicon after download
    - Connect icons in the tag head
    - It is important that the original image is exactly equal proportions of the sides
4. Generate fonts: https://fontie.pixelsvsbytes.com/webfont-generator
    - Click the Format tab, and select: TrueType Font, Web Open Font Format, Web Open Font Format 2
    - Click Generate & download
    - Put the fonts in the folder _assets/fonts
    - Connect fonts in _assets/css/base/_fonts.scss
