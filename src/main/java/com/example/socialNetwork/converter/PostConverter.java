package com.example.socialNetwork.converter;

import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.socialNetwork.dto.PostDTO;
import com.example.socialNetwork.entity.PostEntity;

@Component
public class PostConverter {

	@Autowired
	private TopicConverter topicConverter;

	@Autowired
	private UserConverter userConverter;

//	@Autowired
//	private PostRepository postRepository;
	
	public PostEntity toEntity(PostDTO dto) {
		PostEntity entity = new PostEntity();
		entity.setRoomType(dto.getRoomType());
		entity.setAmount(dto.getAmount());
		entity.setCapacity(dto.getCapacity());
		entity.setGender(dto.getGender());
		entity.setSize(dto.getSize());
		entity.setRentPrice(dto.getRentPrice());
		entity.setDeposit(dto.getDeposit());
		entity.setElectricityPrice(dto.getElectricityPrice());
		entity.setInternetPrice(dto.getInternetPrice());
		entity.setWaterPrice(dto.getWaterPrice());
		entity.setParkingFee(dto.getParkingFee());
		entity.setProvince(dto.getProvince());
		entity.setDistrict(dto.getDistrict());
		entity.setWards(dto.getWards());
		entity.setStreetName(dto.getStreetName());
		entity.setHouseNumber(dto.getHouseNumber());
		entity.setPhoneNumber(dto.getPhoneNumber());
		entity.setTitle(dto.getTitle());
		entity.setDescription(dto.getDescription());

		entity.setConditioner(dto.getConditioner());
		entity.setPrivateWc(dto.getPrivateWc());
		entity.setParking(dto.getParking());
		entity.setWifi(dto.getWifi());
		entity.setFreedom(dto.getFreedom());
		entity.setKeyy(dto.getKeyy());
		entity.setBed(dto.getBed());
		entity.setKitchen(dto.getKitchen());
		entity.setPet(dto.getPet());
		entity.setGuard(dto.getGuard());
		entity.setCloset(dto.getCloset());
		entity.setTablee(dto.getTablee());
		entity.setWindoww(dto.getWindoww());
		entity.setRefrigerator(dto.getRefrigerator());
		entity.setWaterHeater(dto.getWaterHeater());

		return entity;
	}

	public PostDTO toDto(PostEntity entity) {
		PostDTO dto = new PostDTO();
		dto.setId(entity.getId());
		dto.setRoomType(entity.getRoomType());
		dto.setAmount(entity.getAmount());
		dto.setCapacity(entity.getCapacity());
		dto.setGender(entity.getGender());
		dto.setSize(entity.getSize());
		dto.setRentPrice(entity.getRentPrice());
		dto.setDeposit(entity.getDeposit());
		dto.setElectricityPrice(entity.getElectricityPrice());
		dto.setInternetPrice(entity.getInternetPrice());
		dto.setWaterPrice(entity.getWaterPrice());
		dto.setParkingFee(entity.getParkingFee());
		dto.setProvince(entity.getProvince());
		dto.setDistrict(entity.getDistrict());
		dto.setWards(entity.getWards());
		dto.setStreetName(entity.getStreetName());
		dto.setHouseNumber(entity.getHouseNumber());
		dto.setPhoneNumber(entity.getPhoneNumber());
		dto.setTitle(entity.getTitle());
		dto.setDescription(entity.getDescription());

		dto.setConditioner(entity.getConditioner());
		dto.setPrivateWc(entity.getPrivateWc());
		dto.setParking(entity.getParking());
		dto.setWifi(entity.getWifi());
		dto.setFreedom(entity.getFreedom());
		dto.setKeyy(entity.getKeyy());
		dto.setBed(entity.getBed());
		dto.setKitchen(entity.getKitchen());
		dto.setPet(entity.getPet());
		dto.setGuard(entity.getGuard());
		dto.setCloset(entity.getCloset());
		dto.setTablee(entity.getTablee());
		dto.setWindoww(entity.getWindoww());
		dto.setRefrigerator(entity.getRefrigerator());
		dto.setWaterHeater(entity.getWaterHeater());

		dto.setTopic(topicConverter.toDto(entity.getTopic()));
		dto.setAuthorUser(userConverter.toDTO(entity.getAuthorUser()));
		dto.getAuthorUser().setPassword(null);
//		dto.getAuthorUser().setId(null);
		dto.getAuthorUser().setUserName(null);
		
//		dto.setLike(postRepository.countLike(dto.getId()));
		
		SimpleDateFormat smp = new SimpleDateFormat("dd/MM/yyyy");
		if(entity.getCreatedDate()!=null)
			dto.setCreatedDate(smp.format(entity.getCreatedDate()));
		
		return dto;
	}

	public PostEntity toEntity(PostDTO dto, PostEntity entity) {
		String roomType = dto.getRoomType();
		Long amount = dto.getAmount();
		Long capacity = dto.getCapacity();
		String gender = dto.getGender();
		Long size = dto.getSize();
		Long rentPrice = dto.getRentPrice();
		Long deposit = dto.getDeposit();
		Long electricityPrice = dto.getElectricityPrice();
		Long internetPrice = dto.getInternetPrice();
		Long waterPrice = dto.getWaterPrice();
		Long parkingFee = dto.getParkingFee();
		String province = dto.getProvince();
		String district = dto.getDistrict();
		String wards = dto.getWards();
		String streetName = dto.getStreetName();
		String houseNumber = dto.getHouseNumber();
		String phoneNumber = dto.getPhoneNumber();
		String title = dto.getTitle();
		String description = dto.getDescription();

		Integer conditioner = dto.getConditioner();
		Integer privateWc = dto.getPrivateWc();
		Integer parking = dto.getParking();
		Integer wifi = dto.getWifi();
		Integer freedom = dto.getFreedom();
		Integer key = dto.getKeyy();
		Integer bed = dto.getBed();
		Integer kitchen = dto.getKitchen();
		Integer pet = dto.getPet();
		Integer guard = dto.getGuard();
		Integer closet = dto.getCloset();
		Integer table = dto.getTablee();
		Integer window = dto.getWindoww();
		Integer refrigerator = dto.getRefrigerator();
		Integer waterHeater = dto.getWaterHeater();

		if(conditioner != null)
			entity.setConditioner(conditioner);
		if(privateWc != null)
			entity.setPrivateWc(privateWc);
		if(parking != null)
			entity.setParking(parking);
		if(wifi != null)
			entity.setWifi(wifi);
		if(freedom != null)
			entity.setFreedom(freedom);
		if(key != null)
			entity.setKeyy(key);
		if(bed != null)
			entity.setBed(bed);
		if(kitchen != null)
			entity.setKitchen(kitchen);
		if(pet != null)
			entity.setPet(pet);
		if(guard != null)
			entity.setGuard(guard);
		if(closet != null)
			entity.setCloset(closet);
		if(table != null)
			entity.setTablee(table);
		if(window != null)
			entity.setWindoww(window);
		if(refrigerator != null)
			entity.setRefrigerator(waterHeater);
		if(waterHeater != null)
			entity.setWaterHeater(waterHeater);
		
		
		if (roomType != null)
			entity.setRoomType(roomType);
		if (amount != null)
			entity.setAmount(amount);
		if (capacity != null)
			entity.setCapacity(capacity);
		if (gender != null)
			entity.setGender(gender);
		if (size != null)
			entity.setSize(size);
		if (rentPrice != null)
			entity.setRentPrice(rentPrice);
		if (deposit != null)
			entity.setDeposit(deposit);
		if (electricityPrice != null)
			entity.setElectricityPrice(electricityPrice);
		if (internetPrice != null)
			entity.setInternetPrice(internetPrice);
		if (waterPrice != null)
			entity.setWaterPrice(waterPrice);
		if (parkingFee != null)
			entity.setParkingFee(parkingFee);
		if (province != null)
			entity.setProvince(province);
		if (district != null)
			entity.setDistrict(district);
		if (wards != null)
			entity.setWards(wards);
		if (streetName != null)
			entity.setStreetName(streetName);
		if (houseNumber != null)
			entity.setHouseNumber(houseNumber);
		if (phoneNumber != null)
			entity.setPhoneNumber(phoneNumber);
		if (title != null)
			entity.setTitle(title);
		if (description != null)
			entity.setDescription(description);
//		TopicDTO topic = dto.getTopic();
//		UserDTO authorUser = dto.getAuthorUser();

		return entity;
	}
}
