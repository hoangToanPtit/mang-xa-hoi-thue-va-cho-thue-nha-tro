package com.example.socialNetwork.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PostDTO{
	@Override
	public String toString() {
		return "PostDTO [id=" + id + ", gender=" + gender + ", houseNumber=" + houseNumber + ", phoneNumber="
				+ phoneNumber + ", title=" + title + ", conditioner=" + conditioner + ", privateWc=" + privateWc + "]";
	}

	private Long id;
	private String roomType;
	private Long amount;
	private Long capacity;
	private String gender;
	private Long size;
	private Long rentPrice;
	private Long deposit;
	private Long electricityPrice;
	private Long internetPrice;
	private Long waterPrice;
	private Long parkingFee;
	private String province;
	private String district;
	private String wards;
	private String streetName;
	private String houseNumber;
	private String phoneNumber;
	private String title;
	private String description;
	
	private Integer conditioner;
	private Integer privateWc;
	private Integer parking;
	private Integer wifi;
	private Integer freedom;
	private Integer keyy;
	private Integer bed;
	private Integer kitchen;
	private Integer pet;
	private Integer guard;
	private Integer closet;
	private Integer tablee;
	private Integer windoww;
	private Integer refrigerator;
	private Integer waterHeater;
	
	private String createdDate;
	private String modifiedDate;

	private TopicDTO topic;
	private UserDTO authorUser;
	private List<UserDTO> userLikes = new ArrayList<>();
	private int like;
	private List<UserDTO> userSaves = new ArrayList<>();
	private List<CommentDTO> comments = new ArrayList<>();
	private List<ImageDTO> images = new ArrayList<>();
	

	public PostDTO() {
		// TODO Auto-generated constructor stub
	}

	public PostDTO(Long id) {
		super();
		this.id = id;
	}

	
	
	public PostDTO(Long id, String roomType, Long amount, Long capacity, String gender, Long size, Long rentPrice,
			Long deposit, Long electricityPrice, Long internetPrice, Long waterPrice, Long parkingFee, String province,
			String district, String wards, String streetName, String houseNumber, String phoneNumber, String title,
			String description, Integer conditioner, Integer privateWc, Integer parking, Integer wifi, Integer freedom,
			Integer keyy, Integer bed, Integer kitchen, Integer pet, Integer guard, Integer closet, Integer tablee,
			Integer windoww, Integer refrigerator, Integer waterHeater, String createdDate, String modifiedDate,
			TopicDTO topic, UserDTO authorUser, List<UserDTO> userLikes, int like, List<UserDTO> userSaves,
			List<CommentDTO> comments, List<ImageDTO> images) {
		super();
		this.id = id;
		this.roomType = roomType;
		this.amount = amount;
		this.capacity = capacity;
		this.gender = gender;
		this.size = size;
		this.rentPrice = rentPrice;
		this.deposit = deposit;
		this.electricityPrice = electricityPrice;
		this.internetPrice = internetPrice;
		this.waterPrice = waterPrice;
		this.parkingFee = parkingFee;
		this.province = province;
		this.district = district;
		this.wards = wards;
		this.streetName = streetName;
		this.houseNumber = houseNumber;
		this.phoneNumber = phoneNumber;
		this.title = title;
		this.description = description;
		this.conditioner = conditioner;
		this.privateWc = privateWc;
		this.parking = parking;
		this.wifi = wifi;
		this.freedom = freedom;
		this.keyy = keyy;
		this.bed = bed;
		this.kitchen = kitchen;
		this.pet = pet;
		this.guard = guard;
		this.closet = closet;
		this.tablee = tablee;
		this.windoww = windoww;
		this.refrigerator = refrigerator;
		this.waterHeater = waterHeater;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.topic = topic;
		this.authorUser = authorUser;
		this.userLikes = userLikes;
		this.like = like;
		this.userSaves = userSaves;
		this.comments = comments;
		this.images = images;
	}

	// getter and setter
	public Long getId() {
		return id;
	}

	public TopicDTO getTopic() {
		return topic;
	}
	
	

	public int getLike() {
		return like;
	}

	public void setLike(int like) {
		this.like = like;
	}

	public void setTopic(TopicDTO topic) {
		this.topic = topic;
	}

	public String getDescription() {
		return description;
	}

	public Long getAmount() {
		return amount;
	}

	public Long getSize() {
		return size;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public String getModifiedDate() {
		return modifiedDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public void setModifiedDate(String modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public Date fgetCreatedDate() {
		SimpleDateFormat smf = new SimpleDateFormat("dd/MM/yyyy");
		try {
			return smf.parse(createdDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}

	public Date fgetModifiedDate() {
		SimpleDateFormat smf = new SimpleDateFormat("dd/MM/yyyy");
		try {
			return smf.parse(modifiedDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}

	
	public UserDTO getAuthorUser() {
		return authorUser;
	}

	public List<UserDTO> getUserLikes() {
		return userLikes;
	}

	public List<UserDTO> getUserSaves() {
		return userSaves;
	}

	public List<CommentDTO> getComments() {
		return comments;
	}

	public Integer getConditioner() {
		return conditioner;
	}

	public Integer getPrivateWc() {
		return privateWc;
	}

	public Integer getParking() {
		return parking;
	}

	public Integer getWifi() {
		return wifi;
	}

	public Integer getFreedom() {
		return freedom;
	}

	public Integer getKeyy() {
		return keyy;
	}

	public Integer getBed() {
		return bed;
	}

	public Integer getKitchen() {
		return kitchen;
	}

	public Integer getPet() {
		return pet;
	}

	public Integer getGuard() {
		return guard;
	}

	public Integer getCloset() {
		return closet;
	}

	public Integer getTablee() {
		return tablee;
	}

	public Integer getWindoww() {
		return windoww;
	}

	public Integer getRefrigerator() {
		return refrigerator;
	}

	public Integer getWaterHeater() {
		return waterHeater;
	}

	public void setConditioner(Integer conditioner) {
		this.conditioner = conditioner;
	}

	public void setPrivateWc(Integer privateWc) {
		this.privateWc = privateWc;
	}

	public void setParking(Integer parking) {
		this.parking = parking;
	}

	public void setWifi(Integer wifi) {
		this.wifi = wifi;
	}

	public void setFreedom(Integer freedom) {
		this.freedom = freedom;
	}

	public void setKeyy(Integer key) {
		this.keyy = key;
	}

	public void setBed(Integer bed) {
		this.bed = bed;
	}

	public void setKitchen(Integer kitchen) {
		this.kitchen = kitchen;
	}

	public void setPet(Integer pet) {
		this.pet = pet;
	}

	public void setGuard(Integer guard) {
		this.guard = guard;
	}

	public void setCloset(Integer closet) {
		this.closet = closet;
	}

	public void setTablee(Integer table) {
		this.tablee = table;
	}

	public void setWindoww(Integer windoww) {
		this.windoww = windoww;
	}

	public void setRefrigerator(Integer refrigerator) {
		this.refrigerator = refrigerator;
	}

	public void setWaterHeater(Integer waterHeater) {
		this.waterHeater = waterHeater;
	}

	public List<ImageDTO> getImages() {
		return images;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setAmount(Long amount) {
		this.amount = amount;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	public void setAuthorUser(UserDTO authorUser) {
		this.authorUser = authorUser;
	}

	public void setUserLikes(List<UserDTO> userLikes) {
		this.userLikes = userLikes;
	}

	public void setUserSaves(List<UserDTO> userSaves) {
		this.userSaves = userSaves;
	}

	public void setComments(List<CommentDTO> comments) {
		this.comments = comments;
	}

	public void setImages(List<ImageDTO> images) {
		this.images = images;
	}

	public String getRoomType() {
		return roomType;
	}

	public Long getCapacity() {
		return capacity;
	}

	public String getGender() {
		return gender;
	}

	public Long getRentPrice() {
		return rentPrice;
	}

	public Long getDeposit() {
		return deposit;
	}

	public Long getElectricityPrice() {
		return electricityPrice;
	}

	public Long getInternetPrice() {
		return internetPrice;
	}

	public Long getWaterPrice() {
		return waterPrice;
	}

	public Long getParkingFee() {
		return parkingFee;
	}

	public String getProvince() {
		return province;
	}

	public String getDistrict() {
		return district;
	}

	public String getWards() {
		return wards;
	}

	public String getStreetName() {
		return streetName;
	}

	public String getHouseNumber() {
		return houseNumber;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public String getTitle() {
		return title;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public void setCapacity(Long capacity) {
		this.capacity = capacity;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public void setRentPrice(Long rentPrice) {
		this.rentPrice = rentPrice;
	}

	public void setDeposit(Long deposit) {
		this.deposit = deposit;
	}

	public void setElectricityPrice(Long electricityPrice) {
		this.electricityPrice = electricityPrice;
	}

	public void setInternetPrice(Long internetPrice) {
		this.internetPrice = internetPrice;
	}

	public void setWaterPrice(Long waterPrice) {
		this.waterPrice = waterPrice;
	}

	public void setParkingFee(Long parkingFee) {
		this.parkingFee = parkingFee;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public void setWards(String wards) {
		this.wards = wards;
	}

	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}

	public void setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	
	
}



//public Float fgetScore(PostConditionDTO postCondition) {
//	int sc = 0;
//	
//	if(postCondition.getProvince()!=null &&
//			postCondition.getProvince().equalsIgnoreCase(this.province)) sc+=1;
//	if(postCondition.getDistrict()!=null &&
//			postCondition.getDistrict().equalsIgnoreCase(this.district)) sc+=5;
//	if(postCondition.getWards()!=null &&
//			postCondition.getWards().equalsIgnoreCase(this.wards)) sc+=7;
//	if(postCondition.getStreetName()!=null && 
//			postCondition.getStreetName().contains(this.streetName)) sc+=10;
//	
//	if(postCondition.getFirstRentPrice()<=this.rentPrice &&
//			postCondition.getLastRentPrice()>=this.rentPrice) {
//		sc+=20;
//	}
//	
//	
//	if(postCondition.getFirstSize()<=this.size &&
//			postCondition.getLastSize()>=this.size) {
//		sc+=5;
//	}
//	
//	List<String> roomTypes = postCondition.getRoomType();
//	for (String str : roomTypes) {
//		if(str.equals(this.roomType)) {
//			sc+=5;
//		}
//	}
//	if(postCondition.getCapacity()>=this.capacity) sc+=2;
//	if(postCondition.getGender().equalsIgnoreCase(this.gender)) sc+=2;
//	if(postCondition.getCapacity()>=this.conditioner) sc+=1;
//	if(postCondition.getCapacity()>=this.privateWc) sc+=1;
//	if(postCondition.getCapacity()>=this.parking) sc+=1;
//	if(postCondition.getCapacity()>=this.wifi) sc+=1;
//	if(postCondition.getCapacity()>=this.keyy) sc+=1;
//	if(postCondition.getCapacity()>=this.bed) sc+=1;
//	if(postCondition.getCapacity()>=this.pet) sc+=1;
//	if(postCondition.getCapacity()>=this.guard) sc+=1;
//	if(postCondition.getCapacity()>=this.closet) sc+=1;
//	if(postCondition.getCapacity()>=this.tablee) sc+=1;
//	if(postCondition.getCapacity()>=this.windoww) sc+=1;
//	if(postCondition.getCapacity()>=this.refrigerator) sc+=1;
//	if(postCondition.getCapacity()>=this.waterHeater) sc+=1;
//	
//	return (float) sc;
//}
