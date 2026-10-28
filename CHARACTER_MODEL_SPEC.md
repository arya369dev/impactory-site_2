# Arya Patole — half-body realistic 3D character production brief

## References
- `references/arya-head-rotation-grid.png`: head angles, hairstyle and facial profile.
- `references/arya-360-turnaround.png`: front/side/back and overhead views for visual reconstruction guidance.
- `assets/arya-portrait.jpg`: formal charcoal blazer and white shirt, half-body appearance.
- `references/skin-texture-quality-reference.pdf`: skin pores, fine hair, natural sheen, realistic editorial lighting; aesthetic technique only, not identity reference.

## Identity and geometry
Preserve the recognizable facial proportions shown in the supplied views, including natural dark wavy hair, brown eyes, medium-brown skin, natural smile, and red forehead tilak. No generic face, beautification, reshaping, or invented facial features. Half-body bust to waist, charcoal-grey blazer over white collared shirt. Natural proportions and anatomy.

## Production asset requirements
- Final deliverable: `models/arya_patole_3d.glb` (binary glTF 2.0).
- Genuine textured 3D geometry with complete head and upper torso, not a billboard or a texture mapped onto a generic mannequin.
- PBR textures: base color, normal, roughness, optional ambient occlusion; ideally 4K authoring textures, with optimized delivery textures for web.
- Distinct eye geometry, accurate hair silhouette/strands or hair cards, detailed jacket/shirt geometry.
- Origin near bust center; consistent up axis Y; optimized mesh and texture sizes; self-contained GLB.
- Optionally rig neck/shoulders for subtle idle breathing and head movement.
- Validate with glTF validator and view in Three.js from front, sides, and back before approval.

## Important limitation
The bundled `models/arya_patole_3d.glb` is STILL THE EXISTING SIMPLE MANNEQUIN PLACEHOLDER, not a reconstructed or photorealistic likeness. The attached 2D reference sheets are not a photogrammetry scan or measured geometry. An external 3D modeling/reconstruction workflow is required to create and approve the real model. Replace that file with the actual approved GLB, keeping its filename, to use the existing website loader and HUD particle reveal.
