package com.example.socialNetwork.api;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.socialNetwork.dto.ImageDTO;
import com.example.socialNetwork.dto.PostDTO;
import com.example.socialNetwork.service.IImageService;

//@CrossOrigin
@RestController
public class ImageAPI {

	@Value("${file.upload-dir}")
	String FILE_DIRECTORY;

	@Autowired
	private IImageService imageService;
	
	@GetMapping(value = "/api/images/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<ByteArrayResource> getImage(@PathVariable Long id) throws IOException {
		ImageDTO imageDTO = new ImageDTO();
		imageDTO = imageService.findById(id);
		final ByteArrayResource inputStream = new ByteArrayResource(
				Files.readAllBytes(Paths.get(FILE_DIRECTORY + id + imageDTO.getPath())));
		return ResponseEntity.status(HttpStatus.OK).contentLength(inputStream.contentLength()).body(inputStream);
	}
	
	@PostMapping("/api/images")
	public ImageDTO fileUpload(@RequestParam("file") MultipartFile file) throws IOException {
		ImageDTO imageDTO = new ImageDTO(file.getOriginalFilename());
		imageDTO = imageService.save(imageDTO);
		
		
		File myFile = new File(FILE_DIRECTORY + imageDTO.getId() + file.getOriginalFilename());
		myFile.createNewFile();
		FileOutputStream fos = new FileOutputStream(myFile);
		fos.write(file.getBytes());
		fos.close();
		return imageDTO;
	}
	
	@PostMapping("/api/images/{postId}")
	public ImageDTO fileUpload(@PathVariable Long postId, @RequestParam("file") MultipartFile file) throws IOException {
		ImageDTO imageDTO = new ImageDTO(file.getOriginalFilename(), new PostDTO(postId));
		imageDTO = imageService.save(imageDTO);
//		System.out.println(FILE_DIRECTORY + imageDTO.getId() + file.getOriginalFilename());  //path
		
		
		File myFile = new File(FILE_DIRECTORY + imageDTO.getId() + file.getOriginalFilename());
		myFile.createNewFile();
		FileOutputStream fos = new FileOutputStream(myFile);
		fos.write(file.getBytes());
		fos.close();
		return imageDTO;
	}

	@PostMapping("/api/multiImages/{postId}")
	public List<ImageDTO> multifileUpload(@PathVariable Long postId, @RequestParam("files") MultipartFile[] files) throws IOException {
		List<ImageDTO> results = new ArrayList<>();
		for (MultipartFile file : files) {
			results.add(fileUpload(postId, file));
		}
		return results;
	}
	
	@PutMapping(value = "/api/images/{postId}")
	public ImageDTO putMethodName(@PathVariable Long postId, @RequestBody ImageDTO model) {
		model.setPost(new PostDTO(postId));
		return imageService.save(model);
	}

	
	@DeleteMapping(value = "/api/images/{id}")
	public void deleteMethodName(@PathVariable Long id) {
		List<Long> ids = new ArrayList<Long>();
		ids.add(id);
		imageService.delete(ids);
	}

}