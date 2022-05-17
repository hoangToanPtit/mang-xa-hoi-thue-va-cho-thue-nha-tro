package com.example.socialNetwork.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.socialNetwork.converter.ImageConverter;
import com.example.socialNetwork.dto.ImageDTO;
import com.example.socialNetwork.entity.ImageEntity;
import com.example.socialNetwork.repository.ImageRepository;
import com.example.socialNetwork.service.IImageService;


@Service
public class ImageService implements IImageService{
	@Autowired
	private ImageRepository imageRepository;
	
	@Autowired
	private ImageConverter imageConverter;	
	
	
	@Override
	public ImageDTO save(ImageDTO imageDTO) {
		ImageEntity imageEntity = new ImageEntity();
		if(imageDTO.getId()==null) {
			imageEntity = imageConverter.toEntity(imageDTO);			
		}else {
			ImageEntity oldImageEntity = imageRepository.findById(imageDTO.getId()).get();
			imageEntity = imageConverter.toEntity(oldImageEntity, imageDTO);
		}
		imageEntity = imageRepository.save(imageEntity);
		return imageConverter.toDto(imageEntity);
	}

	@Override
	public void delete(List<Long> ids) {
		for(long i: ids) {
			imageRepository.deleteById(i);
		}
	}

	@Override
	public List<ImageDTO> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ImageDTO> findAll() {
		List<ImageDTO> results = new ArrayList<>();
		List<ImageEntity> entities = imageRepository.findAll();
		for (ImageEntity item: entities) {
			ImageDTO imageDTO = imageConverter.toDto(item);
			results.add(imageDTO);
		}
		return results;
	}

	@Override
	public List<ImageDTO> findAllInPost(Long postId) {
		List<ImageEntity> result = imageRepository.findAllByPostId(postId);
		List<ImageDTO> dtos = new ArrayList<ImageDTO>();
		for (ImageEntity e : result) {
			dtos.add(imageConverter.toDto(e));
		}
		return dtos;
	}

	@Override
	public int totalItem() {
		return (int) imageRepository.count();
	}

	@Override
	public ImageDTO findById(Long id) {
		return imageConverter.toDto(imageRepository.findById(id).get());
	}

	@Override
	public ImageEntity getById(Long id) {
		return imageRepository.findById(id).get();
	}

}
